from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from app.repositories.category_repository import CategoryRepository
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination import Params
from sqlalchemy import and_, insert, delete, desc, exists, func, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import get_password_hash
from app.models.banner import Banner, BannerTypeEnum
from app.models.category import Feature, FeatureOption, Occupation, Service, Specialization
from app.models.performer import OrganizationVerification, Performer, PerformerAddress, PerformerAvailability, PerformerCertificate, PerformerComplaint, PerformerOccupation, PerformerReview, PerformerReviewAttachment, PerformerService, PerformerServiceAttachment, PerformerSpecialization, PerformerSpecializationFeatureValue, PerformerVideo, PersonVerification, VerificationStatusEnum
from app.models.user import User, UserDevice
from app.models.association_tables import favourite_performers_table
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload, with_loader_criteria, aliased
from sqlalchemy.exc import NoResultFound
from pydantic import UUID4
import uuid
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.schemas.category import FeatureOut
from app.schemas.performer import AdminPerformerFilterParams, AdminPerformerServiceFilterParams, AvailabilityIn, OrganizationVerificationAdminIn, OrganizationVerificationFilterParams, PerformerAboutIn, PerformerAddressIn, PerformerCertificateFilterParams, PerformerCertificatesStatusIn, PerformerCommunicationsIn, PerformerComplaintFilterParams, PerformerComplaintIn, PerformerFilterParams, PerformerOccupationIn, PerformerRegistrationIn, PerformerReviewAdminIn, PerformerReviewAttachmentsStatusIn, PerformerReviewEdit, PerformerReviewFilterParams, PerformerReviewIn, PerformerReviewsPageOut, PerformerReviewsParams, PerformerServiceAttachmentsStatusIn, PerformerServiceIn, PerformerServiceStatusIn, PerformerSpecializationFeaturesIn, PerformerStatusIn, PerformerVideoAdminIn, PerformerVideoFilterParams, PerformerVideosStatusIn, PersonVerificationAdminIn, PersonVerificationFilterParams
from .base_repository import BaseRepository
from geoalchemy2.elements import WKTElement


def make_point(longitude: float, latitude: float) -> WKTElement:
    return WKTElement(f'POINT({longitude} {latitude})', srid=4326)


class PerformerRepository(BaseRepository):

    async def admin_get_performers(self, filters: AdminPerformerFilterParams):
        stmt = (
            select(Performer)
            .join(Performer.user)
            .order_by(desc(Performer.id))
        )
        if filters.city:
            stmt = stmt.where(Performer.city_id == filters.city)
        if filters.verified is not None:
            stmt = stmt.where(Performer.verified == filters.verified)
        if filters.phone:
            stmt = stmt.where(Performer.user.has(User.username.ilike(f"%{filters.phone}%")))
        if filters.active is not None:
            stmt = stmt.where(Performer.active == filters.active)
        if filters.status:
            stmt = stmt.where(Performer.status == filters.status)
        if filters.worker_type:
            stmt = stmt.where(Performer.worker_type == filters.worker_type)

        paginationParams = Params(page=filters.page, size=filters.size)
        return await apaginate(self.session, stmt, params=paginationParams)


    async def get_performer(self, id: int) -> Performer:
        stmt = select(Performer).where(Performer.id == id)
        result = await self.session.execute(stmt)
        performer = result.scalar_one_or_none()
        return performer
        

    async def update_performer(self, performer: Performer, data: PerformerAboutIn) -> Performer:
        performer_data = data.model_dump()
        del performer_data['certificates']
        
        stmt = (
            update(Performer).where(Performer.id == performer.id).values(**performer_data)
        )
        await self.session.execute(stmt)

        # update service attachments
        stmt = (
            update(PerformerCertificate)
            .values(performer_id=None)
        )
        await self.session.execute(stmt)
        stmt = (
            update(PerformerCertificate)
            .where(PerformerCertificate.id.in_(data.certificates or []))
            .values(performer_id=performer.id)
        )
        await self.session.execute(stmt)

        # update performer service object
        await self.session.flush()
        await self.session.refresh(performer, ["certificates"])
        return performer
    

    async def create_performer(self, user: User, data: PerformerRegistrationIn) -> Performer:
        performer = Performer(
            user_id=user.id,
            account_type=data.account_type,
            organization_name=data.organization_name,
            city_id=data.city_id
        )
        self.session.add(performer)
        await self.session.flush()
        await self.session.refresh(performer)
        return performer
    

    async def delete_performer(self, performer: Performer):
        stmt = (
            update(Performer)
            .where(Performer.id == performer.id)
            .values(user_id=None, active=False)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def update_performer_status(self, performer_id: int, data: PerformerStatusIn):
        stmt = (
            update(Performer)
            .where(Performer.id == performer_id)
            .values(status=data.status, status_reason_code=data.status_reason_code)
        )
        await self.session.execute(stmt)
        await self.session.flush()
    

    async def get_performer_by_uid(self, uid: str) -> Performer:
        stmt = select(Performer).where(
            Performer.uid == uid, 
        )
        result = await self.session.execute(stmt)
        performer = result.scalar_one_or_none()
        return performer
    

    async def get_performer_about_info(self, user_id: int) -> Performer:
        stmt = select(Performer).where(
            Performer.user_id == user_id, 
        ).options(
            joinedload(Performer.user),
            joinedload(Performer.city),
            selectinload(Performer.certificates),
        )
        result = await self.session.execute(stmt)
        performer = result.scalar_one_or_none()
        return performer


    async def get_performer_detailed_by_uid(self, uid: str) -> Performer:
        stmt = select(Performer).where(
            Performer.uid == uid, 
        ).options(
            joinedload(Performer.user),
            joinedload(Performer.city),
            selectinload(Performer.addresses)
                .selectinload(PerformerAddress.city),
            selectinload(Performer.specializations)
                .selectinload(PerformerSpecialization.services)
                .selectinload(PerformerService.attachments),
            selectinload(Performer.specializations)
                .selectinload(PerformerSpecialization.services)
                .selectinload(PerformerService.service),
            selectinload(Performer.specializations)
                .selectinload(PerformerSpecialization.specialization)
                .joinedload(Specialization.occupation),
            selectinload(Performer.specializations)
                .selectinload(PerformerSpecialization.feature_values)
                .selectinload(PerformerSpecializationFeatureValue.feature),
            selectinload(Performer.specializations)
                .selectinload(PerformerSpecialization.feature_values)
                .selectinload(PerformerSpecializationFeatureValue.value_multi_options),

            selectinload(Performer.certificates),
            selectinload(Performer.videos),

            with_loader_criteria(
                PerformerCertificate,
                lambda cls: cls.status == "approved",
                include_aliases=True,
            ),
            with_loader_criteria(
                PerformerVideo,
                lambda cls: cls.status == "approved",
                include_aliases=True,
            ),
            with_loader_criteria(
                PerformerService,
                lambda cls: cls.status == "approved",
                include_aliases=True,
            ),
            with_loader_criteria(
                PerformerServiceAttachment,
                lambda cls: cls.status == "approved",
                include_aliases=True,
            ),
        )
        result = await self.session.execute(stmt)
        performer = result.scalar_one_or_none()
        return performer
        

    async def filter_performers(
            self, 
            occupation: Optional[str], 
            specialization: Optional[str], 
            service: Optional[str], 
            features: List[FeatureOut],
            filterParams: PerformerFilterParams,
        ):
        stmt = select(Performer).options(
            joinedload(Performer.user),
            joinedload(Performer.city),
            selectinload(Performer.services)
                .joinedload(PerformerService.service),
            # selectinload(Performer.services)
                # .selectinload(PerformerService.attachments)
        )

        if filterParams.q:
            stmt = stmt.filter(func.to_tsvector('simple', Performer.search_text).op('@@')(func.plainto_tsquery(filterParams.q)))

        if service:
            stmt = stmt.join(Performer.services).join(PerformerService.service).filter(Service.slug == service)
        elif specialization:
            stmt = stmt.join(Performer.specializations).join(PerformerSpecialization.specialization).filter(
                Specialization.slug == specialization
            )
        elif occupation:
            stmt = stmt.join(Performer.occupations).join(Occupation).filter(Occupation.slug == occupation)

        if filterParams.worker_type:
            stmt = stmt.filter(Performer.account_type == filterParams.worker_type)
        if filterParams.verified:
            stmt = stmt.filter(Performer.verified.is_(True))
        if filterParams.city:
            stmt = stmt.filter(Performer.city_id == filterParams.city)

        # Handle feature filters
        for key, value in filterParams.model_extra.items():
            feature = next((feature for feature in features if feature.code == key), None)
            if not feature or not value:
                continue

            if feature.type == "multi_option":
                ids = [int(x) for x in value.split(",")]
                stmt = stmt.join(Performer.specializations).join(PerformerSpecialization.feature_values).filter(
                    and_(
                        PerformerSpecializationFeatureValue.feature_id == feature.id,
                        PerformerSpecializationFeatureValue.value_multi_options.any(FeatureOption.id.in_(ids))
                    )
                )
            elif feature.type == "boolean":
                stmt = stmt.join(Performer.specializations).join(PerformerSpecialization.feature_values).filter(
                    and_(
                        PerformerSpecializationFeatureValue.feature_id == feature.id,
                        PerformerSpecializationFeatureValue.value_boolean.is_(True)
                    )
                )

        stmt = stmt.order_by(Performer.rating.desc())
        # stmt = stmt.offset((params.page - 1) * 10).limit(10)
        # result = await session.execute(stmt)
        # return result.scalars().all()

        paginationParams = Params(page=filterParams.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def create_or_update_availability(self, performer_id: int, availability_data: AvailabilityIn) -> PerformerAvailability:
        # Check for existing availability
        stmt = (
            select(PerformerAvailability)
            .filter(
                PerformerAvailability.performer_id == performer_id,
                PerformerAvailability.day_of_week == availability_data.day_of_week
            ).first()
        ) 
        existing_availability = self.session.execute(stmt) 
        
        if existing_availability:
            # Update existing record
            existing_availability.start_time = availability_data.start_time
            existing_availability.end_time = availability_data.end_time
            existing_availability.is_active = availability_data.is_active
            await self.session.flush()
            existing_availability = await self.session.refresh(existing_availability)
            return existing_availability
        else:
            # Create new record
            new_availability = PerformerAvailability(
                performer_id=performer_id,
                day_of_week=availability_data.day_of_week,
                start_time=availability_data.start_time,
                end_time=availability_data.end_time,
                is_active=availability_data.is_active
            )
            self.session.add(new_availability)
            await self.session.flush()
            new_availability = await self.session.refresh(new_availability)
            return new_availability
        
    
    async def get_all_videos(self, filters: PerformerVideoFilterParams):
        stmt = (
            select(PerformerVideo)
            .options(
                selectinload(PerformerVideo.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerVideo.performer)
                    .selectinload(Performer.city)
            )
            .order_by(desc(PerformerVideo.created_at))
        )

        if filters.status:
            stmt = stmt.where(PerformerVideo.status == filters.status)
        if filters.performer_id:
            stmt = stmt.where(PerformerVideo.performer_id == filters.performer_id)
        
        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def admin_get_video(self, id: int) -> PerformerVideo:
        stmt = (
            select(PerformerVideo)
            .where(PerformerVideo.id == id)
            .options(
                selectinload(PerformerVideo.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerVideo.performer)
                    .selectinload(Performer.city)
            )
        )
        result = await self.session.execute(stmt)
        video = result.scalar_one_or_none()
        return video
    

    async def admin_update_video(self, video: PerformerVideo, data: PerformerVideoAdminIn) -> PerformerVideo: 
        video.status = data.status
        video.status_reason_code = data.status_reason_code  
        self.session.add(video)
        await self.session.flush()


    async def admin_delete_video(self, id: int):
        stmt = (
            delete(PerformerVideo)
            .where(PerformerVideo.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def get_person_verifications(self, filters: PersonVerificationFilterParams):
        stmt = (
            select(PersonVerification)
            .options(
                selectinload(PersonVerification.performer)
                    .selectinload(Performer.user),
                selectinload(PersonVerification.performer)
                    .selectinload(Performer.city)
            )
            .order_by(desc(PersonVerification.created_at))
        )
        if filters.status:
            stmt = stmt.where(PersonVerification.status == filters.status)
        if filters.performer_id:
            stmt = stmt.where(PersonVerification.performer_id == filters.performer_id)

        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def admin_get_person_verification(self, id: int) -> PersonVerification:
        stmt = (
            select(PersonVerification)
            .where(PersonVerification.id == id)
            .options(
                selectinload(PersonVerification.performer)
                    .selectinload(Performer.user),
                selectinload(PersonVerification.performer)
                    .selectinload(Performer.city)
            )
        )
        result = await self.session.execute(stmt)
        verification = result.scalar_one_or_none()
        return verification
    

    async def admin_update_person_verification(self, verification: PersonVerification, data: PersonVerificationAdminIn) -> PersonVerification:
        verification.status = data.status
        verification.status_reason_code = data.status_reason_code
        self.session.add(verification)
        await self.session.flush()
        return verification
    

    async def admin_delete_person_verification(self, id: int):
        stmt = (
            delete(PersonVerification)
            .where(PersonVerification.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def get_organization_verifications(self, filters: OrganizationVerificationFilterParams):
        stmt = (
            select(OrganizationVerification)
            .options(
                selectinload(OrganizationVerification.performer)
                    .selectinload(Performer.user),
                selectinload(OrganizationVerification.performer)
                    .selectinload(Performer.city)
            )
            .order_by(desc(OrganizationVerification.created_at))
        )
        if filters.status: 
            stmt = stmt.where(OrganizationVerification.status == filters.status)
        if filters.performer_id:
            stmt = stmt.where(OrganizationVerification.performer_id == filters.performer_id)

        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def admin_get_organization_verification(self, id: int) -> OrganizationVerification:
        stmt = (
            select(OrganizationVerification)
            .where(OrganizationVerification.id == id)
            .options(
                selectinload(OrganizationVerification.performer)
                    .selectinload(Performer.user),
                selectinload(OrganizationVerification.performer)
                    .selectinload(Performer.city)
            )
        )
        result = await self.session.execute(stmt)
        verification = result.scalar_one_or_none()
        return verification
    

    async def admin_update_organization_verification(self, verification: OrganizationVerification, data: OrganizationVerificationAdminIn) -> PersonVerification:
        verification.status = data.status
        verification.status_reason_code = data.status_reason_code
        self.session.add(verification)
        await self.session.flush()
        return verification
    

    async def admin_delete_organization_verification(self, id: int):
        stmt = (
            delete(OrganizationVerification)
            .where(OrganizationVerification.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def set_verified_status(self, performer_id: int, verified: bool):
        stmt = (
            update(Performer)
            .where(Performer.id == performer_id)
            .values(verified=verified)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def update_communication_methods(self, performer: Performer, data: PerformerCommunicationsIn): 
        stmt = (
            update(Performer)
            .where(Performer.id == performer.id)
            .values(**data.model_dump())
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def admin_get_certificates(self, filters: PerformerCertificateFilterParams):
        """Get paginated list of certificates with performer info."""
        stmt = (
            select(PerformerCertificate)
            .options(
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.city)
            )
            .where(PerformerCertificate.performer_id.isnot(None))
            .order_by(desc(PerformerCertificate.created_at))
        )

        if filters.status:
            stmt = stmt.where(PerformerCertificate.status == filters.status)

        if filters.phone:
            stmt = stmt.join(PerformerCertificate.performer).join(Performer.user).where(
                User.username.ilike(f"%{filters.phone}%")
            )

        paginationParams = Params(page=filters.page, size=filters.size or 20)
        return await apaginate(self.session, stmt, params=paginationParams)

    async def admin_get_certificate(self, certificate_id: int) -> Optional[PerformerCertificate]:
        """Get a single certificate by ID with performer info."""
        stmt = (
            select(PerformerCertificate)
            .options(
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.city)
            )
            .where(PerformerCertificate.id == certificate_id)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def admin_update_certificate(self, certificate_id: int, status: str, status_reason_code: Optional[str] = None) -> Optional[PerformerCertificate]:
        """Update a single certificate's status."""
        stmt = (
            select(PerformerCertificate)
            .options(
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerCertificate.performer)
                    .selectinload(Performer.city)
            )
            .where(PerformerCertificate.id == certificate_id)
        )
        result = await self.session.execute(stmt)
        certificate = result.scalar_one_or_none()

        if certificate:
            certificate.status = status
            certificate.status_reason_code = status_reason_code
            await self.session.flush()

        return certificate
    

    async def admin_get_performer_certificates(self, user_id: int) -> List[PerformerCertificate]:
        stmt = (
            select(PerformerCertificate)
            .where(PerformerCertificate.performer.has(Performer.user_id == user_id))
            .order_by(PerformerCertificate.created_at)
        )
        result = await self.session.execute(stmt)
        certificates = result.scalars().all()
        return certificates
    

    async def admin_update_certificates_status(self, data: PerformerCertificatesStatusIn):
        certificate_ids = [cert.id for cert in data.certificates]
        stmt = (
            select(PerformerCertificate)
            .where(PerformerCertificate.id.in_(certificate_ids))
        )
        result = await self.session.execute(stmt)
        certificates = result.scalars().all()

        data_map = {att.id: att for att in data.certificates}
        for certificate in certificates:
            if certificate.id in data_map:
                certificate.status = data_map[certificate.id].status
                certificate.status_reason_code = data_map[certificate.id].status_reason_code
                self.session.add(certificate)
        await self.session.flush()


    async def admin_get_performer_videos(self, user_id: int) -> List[PerformerVideo]:
        stmt = (
            select(PerformerVideo)
            .where(PerformerVideo.performer.has(Performer.user_id == user_id))
            .order_by(PerformerVideo.created_at)
        )
        result = await self.session.execute(stmt)
        videos = result.scalars().all()
        return videos


    async def admin_update_videos_status(self, data: PerformerVideosStatusIn):
        video_ids = [video.id for video in data.videos]
        stmt = (
            select(PerformerVideo)
            .where(PerformerVideo.id.in_(video_ids))
        )
        result = await self.session.execute(stmt)
        videos = result.scalars().all()

        data_map = {v.id: v for v in data.videos}
        for video in videos:
            if video.id in data_map:
                video.status = data_map[video.id].status
                video.status_reason_code = data_map[video.id].status_reason_code
                self.session.add(video)
        await self.session.flush()


    async def create_certificate(self, performer_id: int, image: str, image_small: str) -> PerformerCertificate:
        certificate = PerformerCertificate(
            # performer_id=performer_id,
            image=image,
            image_small=image_small
        )
        self.session.add(certificate)
        await self.session.flush()
        await self.session.refresh(certificate)
        return certificate
        

    async def get_video(self, id: int) -> PerformerVideo:
        query = select(PerformerVideo).filter(
            PerformerVideo.id == id
        )
        result = await self.session.execute(query)
        video = result.scalar_one_or_none()
        return video
        

    async def get_videos(self, performer_id: int) -> List[PerformerVideo]:
        query = select(PerformerVideo).filter(
            PerformerVideo.performer_id == performer_id
        ).order_by(PerformerVideo.created_at.desc())
        result = await self.session.execute(query)
        videos = result.scalars().all()
        return videos
        
    
    async def create_video(self, performer: Performer, video: str) -> PerformerVideo:
        video_obj = PerformerVideo(
            performer=performer,
            video=video
        )
        self.session.add(video_obj)
        await self.session.flush()
        await self.session.refresh(video_obj)
        return video_obj
        

    async def delete_video(self, video: PerformerVideo):
        await self.session.delete(video)


    async def get_address(self, id: int) -> PerformerAddress:
        stmt = select(PerformerAddress).filter(
            PerformerAddress.id == id
        ).options(
            selectinload(PerformerAddress.city)
        )
        result = await self.session.execute(stmt)
        address = result.scalar_one_or_none()
        return address
    

    async def get_addresses(self, performer: Performer) -> List[PerformerAddress]:
        query = select(PerformerAddress).filter(
            PerformerAddress.performer_id == performer.id
        ).options(
            joinedload(PerformerAddress.city),
        ).order_by(PerformerAddress.created_at.desc())
        result = await self.session.execute(query)
        addresses = result.scalars().all()
        return addresses
        

    async def create_address(self, performer: Performer, data: PerformerAddressIn) -> PerformerAddress:
        coordinates = make_point(
            longitude=data.coordinates.longitude, 
            latitude=data.coordinates.latitude
        )
        address = PerformerAddress(
            performer_id=performer.id,
            title=data.title,
            coordinates=coordinates
        )
        self.session.add(address)
        await self.session.flush()
        await self.session.refresh(address, ["city"])
        return address
        

    async def update_address(self, address: PerformerAddress, data: PerformerAddressIn) -> PerformerAddress:
        address.title = data.title
        address.coordinates = make_point(
            longitude=data.coordinates.longitude, 
            latitude=data.coordinates.latitude
        )
        self.session.add(address)
        await self.session.flush()
        await self.session.refresh(address, ["city"])
        return address


    async def delete_address(self, address: PerformerAddress):
        await self.session.delete(address)

    
    async def get_person_verification(self, performer: Performer):
        stmt = select(PersonVerification).filter(
            PersonVerification.performer_id == performer.id,
            PersonVerification.active == True
        )
        result = await self.session.execute(stmt)
        verification = result.scalar_one_or_none()
        return verification
    

    async def get_organization_verification(self, performer: Performer):
        stmt = select(OrganizationVerification).filter(
            OrganizationVerification.performer_id == performer.id,
            OrganizationVerification.active == True
        )
        result = await self.session.execute(stmt)
        verification = result.scalar_one_or_none()
        return verification
    

    async def inactivate_person_verifications(self, performer: Performer):
        stmt = (
            update(PersonVerification)
            .where(PersonVerification.performer_id == performer.id)
            .values(active=False)
        )
        self.session.execute(stmt)
        await self.session.flush()


    async def inactivate_organization_verifications(self, performer: Performer):
        stmt = (
            update(OrganizationVerification)
            .where(OrganizationVerification.performer_id == performer.id)
            .values(active=False)
        )
        self.session.execute(stmt)
        await self.session.flush()
    

    async def upload_person_verification(self, performer: Performer, id_image: str, selfie: str) -> PersonVerification:
        verification = PersonVerification(
            performer_id=performer.id,
            id_image=id_image,
            selfie=selfie
        )
        self.session.add(verification)
        await self.session.flush()
        await self.session.refresh(verification)
        return verification
    

    async def upload_organization_verification(self, performer: Performer, voen: str, voen_image: str) -> OrganizationVerification:
        verification = OrganizationVerification(
            performer_id=performer.id,
            voen=voen,
            voen_image=voen_image
        )
        self.session.add(verification)
        await self.session.flush()
        await self.session.refresh(verification)
        return verification
    

    async def add_occupations_services(
            self, 
            performer_id: int, 
            occupations: List[PerformerOccupationIn], 
            category_repository: CategoryRepository, 
            language: str,
        ):
        for occupation in occupations:
            occ = PerformerOccupation(
                performer_id=performer_id, 
                occupation_id=occupation.id
            )
            self.session.add(occ)
            await self.session.flush()
            await self.session.refresh(occ)

            for specialization in occupation.specializations:
                spec = PerformerSpecialization(
                    performer_id=performer_id,
                    occupation_id=occ.id,
                    specialization_id=specialization.id
                )
                self.session.add(spec)
                await self.session.flush()
                await self.session.refresh(spec)
            
                for service in specialization.services:
                    s, _ = await category_repository.get_or_create_service(name=service, specialization_id=specialization.id, language=language)
                    performer_service = PerformerService(
                        performer_id=performer_id,
                        service_id=s.id,
                        specialization_id=spec.id,
                    )
                    self.session.add(performer_service)
                await self.session.flush()

    async def create_service_attachment(self, image: str, image_small: str):
        attachment = PerformerServiceAttachment(
            image=image,
            image_small=image_small
        )
        self.session.add(attachment)
        await self.session.flush()
        await self.session.refresh(attachment)
        return attachment
    

    async def admin_get_services(self, filters: AdminPerformerServiceFilterParams):
        stmt = (
            select(PerformerService)
            .options(
                selectinload(PerformerService.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerService.performer)
                    .selectinload(Performer.city),
                selectinload(PerformerService.service)
            )
            .order_by(desc(PerformerService.updated_at))
        )

        if filters.performer_id:
            stmt = stmt.where(PerformerService.performer_id == filters.performer_id)
        if filters.status:
            stmt = stmt.where(PerformerService.status == filters.status)
        if filters.phone:
            stmt = stmt.join(PerformerService.performer).join(Performer.user).where(
                User.username.ilike(f"%{filters.phone}%")
            )

        paginationParams = Params(page=filters.page, size=20)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def admin_get_service(self, id) -> PerformerService:
        stmt = (
            select(PerformerService)
            .where(PerformerService.id == id)
            .options(
                selectinload(PerformerService.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerService.performer)
                    .selectinload(Performer.city),
                selectinload(PerformerService.service)
                    .selectinload(Service.specialization),
                selectinload(PerformerService.attachments)
            )
        )
        result = await self.session.execute(stmt)
        service = result.scalar_one_or_none()
        return service
    

    async def admin_update_service_status(self, service: PerformerService, data: PerformerServiceStatusIn) -> PerformerService:
        service.status = data.status
        service.status_reason_code = data.status_reason_code
        self.session.add(service)
        await self.session.flush()
        return service
    

    async def admin_update_service_attachments_status(self, service_id: int, data: PerformerServiceAttachmentsStatusIn):
        attachment_ids = [att.id for att in data.attachments]
        stmt = (
            select(PerformerServiceAttachment)
            .where(PerformerServiceAttachment.service_id == service_id, PerformerServiceAttachment.id.in_(attachment_ids))
        )
        result = await self.session.execute(stmt)
        attachments = result.scalars().all()

        data_map = {att.id: att for att in data.attachments}
        for attachment in attachments:
            if attachment.id in data_map:
                attachment.status = data_map[attachment.id].status
                attachment.status_reason_code = data_map[attachment.id].status_reason_code
                self.session.add(attachment)
        await self.session.flush()


    async def get_service(self, id: int) -> PerformerService:
        stmt = (
            select(PerformerService)
            .where(PerformerService.id == id)
            .options(
                selectinload(PerformerService.service),
                selectinload(PerformerService.specialization)
            )
        )
        result = await self.session.execute(stmt)
        service = result.scalar_one_or_none()
        return service


    async def create_service(self, performer: Performer, service: Service, data: PerformerServiceIn):
        service_data = data.model_dump()
        del service_data['attachments']
        del service_data['service']
        performer_service = PerformerService(
            performer_id=performer.id,
            service_id=service.id,
            **service_data
        )
        self.session.add(performer_service)
        await self.session.flush()
        
        stmt = (
            update(PerformerServiceAttachment)
            .values(service_id=None)
        )
        await self.session.execute(stmt)

        stmt = (
            update(PerformerServiceAttachment)
            .where(PerformerServiceAttachment.id.in_(data.attachments or []))
            .values(service_id=performer_service.id)
        )
        await self.session.execute(stmt)

        await self.session.refresh(performer_service, ['service', 'attachments'])
        return performer_service


    async def edit_service(self, service: Service, performer_service: PerformerService, data: PerformerServiceIn):
        service_data = data.model_dump()
        del service_data['attachments']
        del service_data['service']

        # update performer service field values
        for field, value in service_data.items():
            setattr(performer_service, field, value)
        performer_service.service_id = service.id
        await self.session.flush()

        # update service attachments
        stmt = (
            update(PerformerServiceAttachment)
            .values(service_id=None)
        )
        await self.session.execute(stmt)
        stmt = (
            update(PerformerServiceAttachment)
            .where(PerformerServiceAttachment.id.in_(data.attachments or []))
            .values(service_id=performer_service.id)
        )
        await self.session.execute(stmt)

        # update performer service object
        await self.session.flush()
        await self.session.refresh(performer_service, ["service", "attachments"])
        return performer_service

    
    async def delete_service(self, service: PerformerService):
        await self.session.delete(service)
        

    async def get_occupations(self, performer: Performer) -> List[PerformerOccupation]:
        stmt = (
            select(PerformerOccupation)
            .where(PerformerOccupation.performer_id == performer.id)
        )
        result = await self.session.execute(stmt)
        occupations = result.scalars().all()
        return occupations
    
    async def add_occupations(self, performer: Performer, occupations: List[int]):
        occupations = [
            PerformerOccupation(
                occupation_id=occupation_id,
                performer_id=performer.id,
            )
            for occupation_id in occupations
        ]
        for occupation in occupations:
            self.session.add(occupation)
        await self.session.flush()

    
    async def get_specializations(
            self, 
            performer: Performer, 
            specializations: Optional[List[Specialization]] = None
    ) -> List[PerformerSpecialization]:
        stmt = (
            select(PerformerSpecialization)
            .options(
                selectinload(PerformerSpecialization.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(PerformerSpecialization.services)
                    .selectinload(PerformerService.attachments),
                selectinload(PerformerSpecialization.services)
                    .selectinload(PerformerService.service),
                selectinload(PerformerSpecialization.feature_values)
                    .selectinload(PerformerSpecializationFeatureValue.feature),
                selectinload(PerformerSpecialization.feature_values)
                    .selectinload(PerformerSpecializationFeatureValue.value_multi_options)
            )
            .join(PerformerSpecialization.specialization)
            .join(Specialization.occupation)
            .where(PerformerSpecialization.performer_id == performer.id)
            .order_by(Occupation.rank)
        )
        if specializations:
            specializations = [s.id for s in specializations]
            stmt = stmt.where(PerformerSpecialization.specialization_id.in_(specializations))

        result = await self.session.execute(stmt)
        specializations = result.scalars().all()
        return specializations
    

    async def get_specialization(self, id: int) -> PerformerSpecialization:
        stmt = (
            select(PerformerSpecialization)
            .where(
                PerformerSpecialization.id == id
            )
        )
        result = await self.session.execute(stmt)
        specialization = result.scalar_one_or_none()
        return specialization

    
    async def get_specialization_detailed(self, id: int) -> PerformerSpecialization:
        FilteredService = aliased(Service)
        stmt = (
            select(PerformerSpecialization)
            .options(
                selectinload(PerformerSpecialization.specialization)
                    .selectinload(Specialization.occupation),
                # selectinload(PerformerSpecialization.specialization)
                #     .selectinload(Specialization.services),
                    # .options(
                    #     with_loader_criteria(
                    #         FilteredService,
                    #         FilteredService.is_default == True,
                    #         include_aliases=True,
                    #     )
                    # ),
                # selectinload(PerformerSpecialization.specialization)
                    # .selectinload(Specialization.services),
                # selectinload(PerformerSpecialization.specialization)
                #     .options(
                #         selectinload(Specialization.occupation),
                #         selectinload(Specialization.services)
                #             .options(
                #                 with_loader_criteria(
                #                     FilteredService,
                #                     Service.is_default == True,
                #                     include_aliases=True
                #                 )
                #             )
                #     ),
                selectinload(PerformerSpecialization.specialization)
                    .selectinload(Specialization.features)
                    .selectinload(Feature.options),
                selectinload(PerformerSpecialization.services)
                    .selectinload(PerformerService.attachments),
                selectinload(PerformerSpecialization.services)
                    .selectinload(PerformerService.service),
                selectinload(PerformerSpecialization.feature_values)
                    .selectinload(PerformerSpecializationFeatureValue.feature),
                selectinload(PerformerSpecialization.feature_values)
                    .selectinload(PerformerSpecializationFeatureValue.value_multi_options),
                # with_loader_criteria(
                #     FilteredService,
                #     FilteredService.id > 0,
                #     include_aliases=True  # safer when joins or aliases are involved
                # ),
            )
            .join(PerformerSpecialization.specialization)
            .join(Specialization.occupation)
            .where(
                PerformerSpecialization.id == id
            )
            .order_by(Occupation.rank)
        )
        result = await self.session.execute(stmt)
        specialization = result.scalar_one_or_none()
        print(">> specialization", specialization)
        return specialization
    

    async def add_specializations(
            self, 
            performer: Performer,
            performer_occupations: List[PerformerOccupation], 
            specializations: List[Specialization]
        ):
        for specialization in specializations:
            occupation_id = next((obj.id for obj in performer_occupations if obj.occupation_id == specialization.occupation_id), None)
            s = PerformerSpecialization(
                occupation_id=occupation_id,
                performer_id=performer.id,
                specialization_id=specialization.id,
            )
            self.session.add(s)
        
        await self.session.flush()
       

    async def delete_specialization_features(self, specialization: PerformerSpecialization):
        stmt = (
            delete(PerformerSpecializationFeatureValue)
            .where(PerformerSpecializationFeatureValue.specialization_id == specialization.id)
        )
        await self.session.execute(stmt)


    async def set_specialization_features(self, specialization: PerformerSpecialization, features: List[PerformerSpecializationFeaturesIn]):
        for feature in features:
            value = feature.value
            feature_value = PerformerSpecializationFeatureValue(
                feature_id=feature.id,
                specialization_id=specialization.id,
            )
            if isinstance(value, bool):
                feature_value.value_boolean = value
            elif isinstance(value, list):
                stmt = select(FeatureOption).where(
                    FeatureOption.id.in_(value)
                )
                result = await self.session.execute(stmt)
                feature_value.value_multi_options = result.scalars().all()
            self.session.add(feature_value)


    async def delete_specialization(self, specialization: PerformerSpecialization):
        await self.session.delete(specialization)


    async def get_my_review(self, user_id: int, performer_id: int) -> Optional[PerformerReview]:
        stmt = (
            select(PerformerReview)
            .where(PerformerReview.user_id == user_id)
            .options(
                joinedload(PerformerReview.user),
                selectinload(PerformerReview.attachments)
            )
        )
        result = await self.session.execute(stmt)
        review = result.scalar_one_or_none()
        return review
        

    async def get_reviews(self, performer: Performer, params=PerformerReviewsParams) -> PerformerReviewsPageOut:
        limit = 20  # default limit
        fetch_limit = limit + 1

        stmt = (
            select(PerformerReview)
            .where(PerformerReview.performer_id == performer.id, PerformerReview.status == "approved")
            .options(
                joinedload(PerformerReview.user),
                selectinload(PerformerReview.attachments)
            )
            .join(PerformerReview.user)
            .order_by(desc(PerformerReview.updated_at))
            .limit(fetch_limit)
        )

        filters = []

        if params.rating is not None:
            filters.append(PerformerReview.rating == params.rating)

        if params.cursor is not None:
            filters.append(PerformerReview.updated_at < params.cursor)

        if filters:
            stmt = stmt.where(and_(*filters))

        result = await self.session.execute(stmt)
        reviews = result.scalars().all()

        has_next = len(reviews) > limit
        items = reviews[:limit]
        next_cursor = int(items[-1].updated_at.timestamp()) if has_next else None

        return PerformerReviewsPageOut(
            items=items,
            has_next=has_next,
            next_cursor=next_cursor

        )

        # result = await self.session.execute(stmt)
        # reviews = result.scalars().all()

        # paginationParams = Params(page=params.page, size=20)
        # return await apaginate(self.session, stmt, params=paginationParams)


    async def get_all_reviews(self, filters: PerformerReviewFilterParams):
        stmt = (
            select(PerformerReview)
            .options(
                joinedload(PerformerReview.user),
                selectinload(PerformerReview.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerReview.attachments),
            )
            .join(PerformerReview.user)
            .order_by(desc(PerformerReview.updated_at))
        )

        if filters.user_id:
            stmt = stmt.where(PerformerReview.user_id == filters.user_id)
        if filters.performer_id:
            stmt = stmt.where(PerformerReview.performer_id == filters.performer_id)

        paginationParams = Params(page=filters.page, size=20)
        return await apaginate(self.session, stmt, params=paginationParams)
        

    async def get_review(self, id: int) -> PerformerReview:
        stmt = select(PerformerReview).where(PerformerReview.id == id)
        result = await self.session.execute(stmt)
        review = result.scalar_one_or_none()
        return review
    

    async def get_review_detailed(self, id: int) -> PerformerReview:
        stmt = (
            select(PerformerReview)
            .where(PerformerReview.id == id)
            .options(
                selectinload(PerformerReview.user),
                selectinload(PerformerReview.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerReview.performer)
                    .selectinload(Performer.city),
                selectinload(PerformerReview.attachments)
            )
        )
        result = await self.session.execute(stmt)
        performer = result.scalar_one_or_none()
        return performer
    

    async def create_review_attachment(self, image: str, image_small: str):
        attachment = PerformerReviewAttachment(
            image=image,
            image_small=image_small
        )
        self.session.add(attachment)
        await self.session.flush()
        await self.session.refresh(attachment)
        return attachment

    
    async def create_review(self, user_id: int, performer: Performer, data: PerformerReviewIn) -> PerformerReview:
        review = PerformerReview(
            user_id=user_id,
            performer_id=performer.id,
            rating=data.rating,
            description=data.description
        )
        if not data.description:
            review.status = VerificationStatusEnum.APPROVED

        self.session.add(review)
        await self.session.flush()

        # set review attachments
        stmt = (
            update(PerformerReviewAttachment)
            .where(PerformerReviewAttachment.id.in_(data.attachments or []))
            .values(review_id=review.id)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        await self.session.refresh(review, ['user', 'attachments'])
        return review
        

    async def update_review(self, review: PerformerReview, data: PerformerReviewEdit) -> PerformerReview:
        review_data = data.model_dump()
        print(review_data)
        del review_data['attachments']
        
        if not data.description:
            review.status = VerificationStatusEnum.APPROVED
        elif data.description and data.description != review.description:
            review.status = VerificationStatusEnum.PENDING

        for field, value in review_data.items():
            setattr(review, field, value)

        # update review attachments
        stmt = (
            update(PerformerReviewAttachment)
            .values(review_id=None)
        )
        await self.session.execute(stmt)

        # set review attachments
        stmt = (
            update(PerformerReviewAttachment)
            .where(PerformerReviewAttachment.id.in_(data.attachments or []))
            .values(review_id=review.id)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        await self.session.refresh(review, ['user', 'attachments'])
        return review
        
    
    async def delete_review(self, review: PerformerReview):
        await self.session.delete(review)
        await self.session.flush()


    async def admin_delete_review(self, id: int):
        stmt = (
            delete(PerformerReview)
            .where(PerformerReview.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def admin_update_review(self, review: PerformerReview, data: PerformerReviewAdminIn) -> PerformerReview:
        review.status = data.status
        review.status_reason_code = data.status_reason_code
        self.session.add(review)
        await self.session.flush()
        return review
    

    async def admin_update_review_attachments_status(self, review_id: int, data: PerformerReviewAttachmentsStatusIn):
        attachment_ids = [att.id for att in data.attachments]
        stmt = (
            select(PerformerReviewAttachment)
            .where(PerformerReviewAttachment.review_id == review_id, PerformerServiceAttachment.id.in_(attachment_ids))
        )
        result = await self.session.execute(stmt)
        attachments = result.scalars().all()

        data_map = {att.id: att for att in data.attachments}
        for attachment in attachments:
            if attachment.id in data_map:
                attachment.status = data_map[attachment.id].status
                attachment.status_reason_code = data_map[attachment.id].status_reason_code
                self.session.add(attachment)
        await self.session.flush()

    
    async def update_performer_rating(self, performer_id: int):
        stmt = (
            select(
                func.avg(PerformerReview.rating).label("avg_rating"),
                func.count(PerformerReview.id).label("review_count")
            )
            .where(PerformerReview.performer_id == performer_id, PerformerReview.status == VerificationStatusEnum.APPROVED)
        )
        result = await self.session.execute(stmt)
        avg_rating, review_count = result.one()
        print(">> average rating: " , avg_rating, review_count)

        await self.session.execute(
            update(Performer)
            .where(Performer.id == performer_id)
            .values(
                rating=avg_rating or 0,
                review_count=review_count
            )
        )
        await self.session.flush()
        return avg_rating, review_count


    async def get_banner(self, performer: Performer) -> Banner:
        stmt = (
            select(Banner)
            .where(Banner.performer_id == performer.id)
            .join(Banner.performer)
        )
        result = await self.session.execute(stmt)
        banner = result.scalar_one_or_none()
        return banner
        

    async def add_banner(self, performer: Performer, image: str):
        banner = Banner(
            performer_id=performer.id,
            type=BannerTypeEnum.PERFORMER_AD,
            image=image,
        )
        self.session.add(banner)
        await self.session.flush()
        await self.session.refresh(banner)
        return banner

    
    async def update_banner(self, banner: Banner, image: str) -> Banner:
        banner.image = image
        banner.status = "pending"
        banner.expire_at = None
        await self.session.flush()
        await self.session.refresh(banner)
        return banner
       

    async def delete_banner(self, banner: Banner):
        await self.session.delete(banner)

    
    async def extend_banner_time(self, banner: Banner, days: int) -> Banner:
        if banner.expire_at:
            banner.expire_at = max(banner.expire_at, datetime.now(timezone.utc)) + timedelta(days=days)
        else:
            banner.expire_at = datetime.now(timezone.utc) + timedelta(days=days)
        
        self.session.add(banner)
        await self.session.flush()
        await self.session.refresh(banner)
        return banner


    async def is_favourite_performer(self, user: User, performer: Performer) -> bool:
        stmt = select(
            exists().where(
                (favourite_performers_table.c.user_id == user.id) &
                (favourite_performers_table.c.performer_id == performer.id)
            )
        )
        result = await self.session.execute(stmt)
        return result.scalar()
    

    async def get_favourite_performers(self, user: User, page: int):
        stmt = (
            select(Performer)
            .join(favourite_performers_table)
            .join(User)
            .where(User.id == user.id)
            .order_by(desc(favourite_performers_table.c.created_at))
        )
        paginationParams = Params(page=page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)


    async def add_favourite_performer(self, user: User, performer: Performer):
        stmt = insert(favourite_performers_table).values(
            user_id=user.id,
            performer_id=performer.id,
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def delete_favourite_performer(self, user: User, performer: Performer):
        stmt = delete(favourite_performers_table).where(
            favourite_performers_table.c.user_id == user.id,
            favourite_performers_table.c.performer_id == performer.id
        )
        await self.session.execute(stmt)
        await self.session.flush(stmt)
        

    async def complain(self, user: User, performer: Performer, data: PerformerComplaintIn) -> PerformerComplaint:
        complaint = PerformerComplaint(
            user_id=user.id,
            performer_id=performer.id,
            title=data.title,
            description=data.description,
        )
        self.session.add(complaint)
        await self.session.flush()
        await self.session.refresh(complaint)
        return complaint


    async def get_complaints(self, filters: PerformerComplaintFilterParams):
        stmt = (
            select(PerformerComplaint)
            .join(PerformerComplaint.user)
            .order_by(desc(PerformerComplaint.created_at))
            .options(
                selectinload(PerformerComplaint.user),
                selectinload(PerformerComplaint.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerComplaint.performer)
                    .selectinload(Performer.city)
            )
        )
        if filters.user_id:
            stmt = stmt.where(PerformerComplaint.user_id == filters.user_id)
        if filters.username:
            stmt = stmt.where(User.username.ilike(f'%{filters.username}%'))
        if filters.performer_id:
            stmt = stmt.where(PerformerComplaint.performer_id == filters.performer_id)
        if filters.viewed is not None:
            stmt = stmt.where(PerformerComplaint.viewed == filters.viewed)

        paginationParams = Params(page=filters.page, size=filters.size or 10)
        return await apaginate(self.session, stmt, params=paginationParams)
    
    async def get_complaint(self, id: int) -> PerformerComplaint:
        stmt = (
            select(PerformerComplaint)
            .where(PerformerComplaint.id == id)
            .options(
                selectinload(PerformerComplaint.user),
                selectinload(PerformerComplaint.performer)
                    .selectinload(Performer.user),
                selectinload(PerformerComplaint.performer)
                    .selectinload(Performer.city)
            )
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def mark_complaint_viewed(self, id: int, viewed: bool = True) -> PerformerComplaint:
        stmt = (
            update(PerformerComplaint)
            .where(PerformerComplaint.id == id)
            .values(viewed=viewed)
        )
        await self.session.execute(stmt)
        await self.session.flush()
        return await self.get_complaint(id)

    async def delete_complaint(self, id: int):
        stmt = (
            delete(PerformerComplaint)
            .where(PerformerComplaint.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        
