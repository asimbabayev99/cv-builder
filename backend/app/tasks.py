from app.models.order import Order
from celery import Celery, shared_task
import requests
from sqlalchemy import select, update
from sqlalchemy.orm import selectinload
from app.core.config import configs
import time
from moviepy.video.io.VideoFileClip import *
import asyncio
import tempfile
import re
from app.core.database import Database
from app.models.performer import Performer, PerformerReview, PerformerSpecialization, PerformerVideo, PerformerSpecializationFeatureValue, PerformerService
from app.services.s3_service import S3Service
from openai import OpenAI


celery = Celery(
    __name__,
    broker=configs.CELERY_BROKER_URL,
    backend=configs.CELERY_RESULT_BACKEND
)

openai_client = OpenAI()

def moderate_text(text: str):
    response = openai_client.chat.completions.create(
        model="gpt-4.1",  # or gpt-4.1-mini / gpt-4o-mini
        messages=[
            {
                "role": "system", 
                "content": "You are a moderation system. Respond ONLY in JSON with flags for categories: harassment, sexual, hate, violence, profanity."
            },
            {
                "role": "user", 
                "content": text
            }
        ]
    )
    response_json = response.model_dump()
    return response_json


def moderate_images(images: list):
    response = openai_client.moderations.create(
        model="omni-moderation-latest",
        input=[
            {
                "type": "image_url",
                "image_url": {
                    "url": image_url,
                }
            }
            for image_url in images
        ],
    )
    response_json = response.model_dump()
    return response_json


@shared_task(bind=True, retry_kwargs={'max_retries': 1, 'countdown': 1})
def send_otp_sms(self, phone_number: str, otp: int):
    time.sleep(5)


@shared_task(bind=True, retry_kwargs={'max_retries': 1, 'countdown': 1})
def generate_thumbnail(self, performer_video_id: int):
    asyncio.run(_generate_thumbnail(performer_video_id))


async def _generate_thumbnail(video_id):
    # Create a temporary file to download the video
    db = Database()
    session_factory = db.session

    async with session_factory() as session:
        videos = await session.execute(select(PerformerVideo).where(PerformerVideo.id == video_id))
        video_obj = videos.scalar_one_or_none()

        if not video_obj:
            return

        with tempfile.NamedTemporaryFile(suffix='.mp4') as temp_video:
            # Download the video content
            response = requests.get(video_obj.video, stream=True)
            if response.status_code == 200:
                temp_video.write(response.content)
                temp_video.flush()
                
                # Load the video file using moviepy
                clip = VideoFileClip(temp_video.name)
                duration = clip.duration
                
                # Generate a thumbnail at 1 second (or any desired time)
                thumbnail_path = tempfile.NamedTemporaryFile(suffix='.jpg').name
                clip.save_frame(thumbnail_path, t=1)
                
                # Save the duration and thumbnail to the model instance
                thumbnail_url = None
                with open(thumbnail_path, 'rb') as thumb_file:
                    s3_service = S3Service()
                    thumbnail_url = s3_service.upload_fileobj(
                        file_obj=thumb_file,
                        folder="videos",
                        filename="thumbnail.jpg",
                        content_type="image/jpeg"
                    )
                    video_obj.duration = duration
                    video_obj.thumbnail = thumbnail_url
                    session.add(video_obj)
                    await session.commit()
                


@shared_task(bind=True, retry_kwargs={'max_retries': 3, 'countdown': 1})
def set_performer_keywords(self, performer_id: int):
    asyncio.run(_generate_thumbnail(_set_performer_keywords(performer_id)))


async def _set_performer_keywords(performer_id: int):
    keywords = set()
    performer = None

    db = Database()
    session_factory = db.session

    async with session_factory() as session:
        stmt = (
            select(Performer)
            .where(Performer.id == performer_id)
            .options(
                selectinload(Performer.specializations)
                    .selectinload(PerformerSpecialization.specialization),
                selectinload(Performer.specializations)
                    .selectinload(PerformerSpecialization.feature_values)
                    .selectinload(PerformerSpecializationFeatureValue.value_multi_options),
                selectinload(Performer.specializations)
                    .selectinload(PerformerSpecialization.services)
                    .selectinload(PerformerService.service)
            )
        )
        result = await session.execute(stmt)
        performer: Performer = result.scalar_one_or_none()

        keywords.update(re.findall(r'\b\w+\b', performer.organization_name))
        keywords.update(re.findall(r'\b\w+\b', performer.description or ""))

        # add specialization keywords
        for performer_specialization in performer.specializations:
            keywords.update(re.findall(r'\b\w+\b', performer_specialization.specialization.name_az))
            keywords.update(re.findall(r'\b\w+\b', performer_specialization.specialization.name_ru))
            keywords.update(performer_specialization.specialization.search_synonyms)

            # add feature options 
            for feature_value in performer_specialization.features:
                if feature_value.feature.type == "multi_option":
                    for option in feature_value.value_multi_option.all():
                        keywords.update(re.findall(r'\b\w+\b', option.name_az))
                        keywords.update(re.findall(r'\b\w+\b', option.name_ru))

            # add service keywords
            for performer_service in performer_specialization.services:
                keywords.update(re.findall(r'\b\w+\b', performer_service.service.name_az))
                keywords.update(re.findall(r'\b\w+\b', performer_service.service.name_ru))
                keywords.update(re.findall(r'\b\w+\b', performer_service.description or ""))
                keywords.update(performer_service.service.search_synonyms)   
        
        search_text = " ".join(keywords)
        stmt = (
            update(Performer)
            .where(Performer.id == performer_id)
            .values(search_text=search_text)
        )
        await session.execute(stmt)
        await session.flush()


@shared_task(bind=True, retry_kwargs={'max-retries': 3, 'countdown': 60})
def moderate_review(self, review_id):
    asyncio.run(_generate_thumbnail(_moderate_review(review_id)))


async def _moderate_review(review_id: int):
    db = Database()
    session_factory = db.session
    text_categories = [
        "harassment", "sexual", "hate", "violence", "profanity"
    ]
    attachment_categories = [
        "harassment", "harassment_threatening", "hate", "hate_threatening", "illicit", 
        "illicit_violent", "self_harm", "self_harm_instructions", "self_harm_intent",
        "sexual", "sexual_minors", "violence", "violence_graphic"
    ]

    async with session_factory() as session:
        stmt = (
            select(PerformerReview)
            .where(PerformerReview.id == review_id)
            .options(
                selectinload(PerformerReview.attachments)
            )
        )

        result = await session.execute(stmt)
        review: PerformerReview = result.scalar_one_or_none()

        # if review is new and has description
        if review.status == "pending" and review.description:
            response = moderate_text(review.description)
            result = response['choices'][0]['message']['content']
            for category in text_categories:
                if category in result and result[category]:
                    review.status = "rejected"
                    review.status_reason_code = category
                    session.add(attachments[i])
                    break

        # filter pending attachments
        attachments = [ attachment for attachment in review.attachments if attachment.status == "pending"]
        if attachments:
            # moderate images
            response = moderate_images(attachments)
            results = response['results']
            for i in range(len(attachments)):
                categories = results[i]['categories']
                # check if forbiddent category is detected for attachment
                for category in attachment_categories:
                    if category in categories and categories[category]:
                        attachments[i].status = "rejected"
                        attachments[i].status_reason_code = category
                        session.add(attachments[i])
                        break
                # if no forbidden category then set status approved
                if attachments[i].status == "pending":
                    attachments[i].status = "approved"
                    attachments[i].status_reason_code = ""
                    session.add(attachments[i])

        # if there is rejected attachment and review is new, set review status rejected 
        if review.status == "pending":
            if any(attachment.status == "rejected" for attachment in attachments):
                review.status = "rejected"
                review.status_reason_code = "inappropriate_content"
                session.add(review)
            else:
                review.status = "approved"
                review.status_reason_code = ""
                session.add(review)

        # flush changes in db
        await session.flush()

        # if approved calculate average rating for performer
        if review.status == "approved":
            pass

        # if rejected notify user about it
        if review.status == "rejected":
            pass



@shared_task(bind=True, retry_kwargs={'max-retries': 3, 'countdown': 60})
def moderate_performer_service(self, performer_service_id):
    asyncio.run(_generate_thumbnail(_moderate_performer_service(performer_service_id)))


async def _moderate_performer_service(performer_service_id: int):
    db = Database()
    session_factory = db.session
    text_categories = [
        "harassment", "sexual", "hate", "violence", "profanity"
    ]
    attachment_categories = [
        "harassment", "harassment_threatening", "hate", "hate_threatening", "illicit", 
        "illicit_violent", "self_harm", "self_harm_instructions", "self_harm_intent",
        "sexual", "sexual_minors", "violence", "violence_graphic"
    ]

    async with session_factory() as session:
        stmt = (
            select(PerformerService)
            .where(PerformerService.id == performer_service_id)
            .options(
                selectinload(PerformerService.attachments),
                selectinload(PerformerService.service)
            )
        )

        result = await session.execute(stmt)
        performer_service: PerformerService = result.scalar_one_or_none()

        # if service is new then it should be manually reviewed
        if not performer_service.service.is_translated:
            return

        # if review is new and has description
        if performer_service.status == "pending" and performer_service.description:
            response = moderate_text(performer_service.description)
            result = response['choices'][0]['message']['content']
            for category in text_categories:
                if category in result and result[category]:
                    performer_service.status = "rejected"
                    performer_service.status_reason_code = category
                    session.add(attachments[i])
                    break

        # filter pending attachments
        attachments = [ attachment for attachment in performer_service.attachments if attachment.status == "pending"]
        if attachments:
            # moderate images
            response = moderate_images(attachments)
            results = response['results']
            for i in range(len(attachments)):
                categories = results[i]['categories']
                # check if forbiddent category is detected for attachment
                for category in attachment_categories:
                    if category in categories and categories[category]:
                        attachments[i].status = "rejected"
                        attachments[i].status_reason_code = category
                        session.add(attachments[i])
                        break
                # if no forbidden category then set status approved
                if attachments[i].status == "pending":
                    attachments[i].status = "approved"
                    attachments[i].status_reason_code = ""
                    session.add(attachments[i])

        # if there is rejected attachment and review is new, set review status rejected 
        if performer_service.status == "pending":
            if any(attachment.status == "rejected" for attachment in attachments):
                performer_service.status = "rejected"
                performer_service.status_reason_code = "inappropriate_content"
                session.add(performer_service)
            else:
                performer_service.status = "approved"
                performer_service.status_reason_code = ""
                session.add(performer_service)

        # flush changes in db
        await session.flush()

        # notify user about status change


@shared_task(bind=True, retry_kwargs={'max-retries': 3, 'countdown': 60})
def moderate_order(self, order_id):
    asyncio.run(_generate_thumbnail(_moderate_order(order_id)))


async def _moderate_order(order_id: int):
    db = Database()
    session_factory = db.session
    text_categories = [
        "harassment", "sexual", "hate", "violence", "profanity"
    ]
    attachment_categories = [
        "harassment", "harassment_threatening", "hate", "hate_threatening", "illicit", 
        "illicit_violent", "self_harm", "self_harm_instructions", "self_harm_intent",
        "sexual", "sexual_minors", "violence", "violence_graphic"
    ]

    async with session_factory() as session:
        stmt = (
            select(Order)
            .where(Order.id == order_id)
            .options(
                selectinload(Order.attachments)
            )
        )

        result = await session.execute(stmt)
        order: Order = result.scalar_one_or_none()

        # if review is new and has description
        if order.status == "pending" and (order.title or order.description):
            text = order.title + "\n" + order.description
            response = moderate_text(text)
            result = response['choices'][0]['message']['content']
            for category in text_categories:
                if category in result and result[category]:
                    order.status = "rejected"
                    order.status_reason_code = category
                    session.add(attachments[i])
                    break

        # filter pending attachments
        attachments = [ attachment for attachment in order.attachments if attachment.status == "pending"]
        if attachments:
            # moderate images
            response = moderate_images(attachments)
            results = response['results']
            for i in range(len(attachments)):
                categories = results[i]['categories']
                # check if forbiddent category is detected for attachment
                for category in attachment_categories:
                    if category in categories and categories[category]:
                        attachments[i].status = "rejected"
                        attachments[i].status_reason_code = category
                        session.add(attachments[i])
                        break
                # if no forbidden category then set status approved
                if attachments[i].status == "pending":
                    attachments[i].status = "approved"
                    attachments[i].status_reason_code = ""
                    session.add(attachments[i])

        # if there is rejected attachment and review is new, set review status rejected 
        if order.status == "pending":
            if any(attachment.status == "rejected" for attachment in attachments):
                order.status = "rejected"
                order.status_reason_code = "inappropriate_content"
                session.add(order)
            else:
                order.status = "approved"
                order.status_reason_code = ""
                session.add(order)

        # flush changes in db
        await session.flush()

        # notify user about order status


