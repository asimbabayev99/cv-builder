import base64
from datetime import datetime, timezone
import io
import os
import uuid
import boto3
from botocore.client import Config
from typing import BinaryIO, Tuple, Union

from fastapi import UploadFile
from app.core.config import configs
from PIL import Image

from app.schemas.performer import PerformerVideoUploadCompleteRequest, PerformerVideoUploadRequest, PerformerVideoUploadResponse


class S3Service:
    def __init__(self):
        self.bucket_name = configs.AWS_STORAGE_BUCKET_NAME
        self.s3 = boto3.client(
            "s3",
            region_name=configs.AWS_S3_REGION_NAME,
            endpoint_url=configs.AWS_S3_ENDPOINT_URL,
            aws_access_key_id=configs.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=configs.AWS_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4")
        )

    def upload_file(self, file: UploadFile, bucket: str, private: bool = False) -> str:
        filename=file.filename 
        content_type=file.content_type
        print(">> filename: ", filename, content_type)
        extension = os.path.splitext(filename)[1]
        today = datetime.now(timezone.utc).strftime('%Y/%m/%d')
        filename = f'{uuid.uuid4().hex}{extension}'
        key = os.path.join(today, filename)

        self.s3.upload_fileobj(
            Fileobj=file.file,
            Bucket=bucket,
            Key=key,
            ExtraArgs={
                "ContentType": content_type, 
                "ACL": "private" if private else "public-read"
            }
        )
        return f"{bucket}/{key}"

    def resize_and_upload_image(self, image: UploadFile, bucket: str) -> Tuple[str, str]:
        image_bytes = image.file.read()
        image.file.close()

        # Upload original image using in-memory BytesIO
        original_file_obj = io.BytesIO(image_bytes)
        original_file_obj.seek(0)
        image_url = self.upload_fileobj(
            file_obj=original_file_obj,
            bucket=bucket,
            filename=image.filename,
            content_type=image.content_type
        )

        # Compress and upload thumbnail
        compressed_file_obj = self.compress_image_from_bytes(image_bytes)
        compressed_filename = f"{uuid.uuid4().hex}.jpeg"
        compressed_image_url = self.upload_fileobj(
            file_obj=compressed_file_obj,
            bucket=bucket,
            filename=compressed_filename,
            content_type='image/jpeg'
        )

        # image_url = self.upload_file(image, bucket)
        # image.file.seek(0)

        # compressed_bytes = self.compress_image(image)
        # compressed_filename = f"{uuid.uuid4().hex}.jpeg"
        # compressed_image_url = self.upload_fileobj(
        #     file_obj=compressed_bytes, 
        #     bucket=bucket,
        #     filename=compressed_filename, 
        #     content_type='image/jpeg'
        # )
        return image_url, compressed_image_url


    def upload_fileobj(self, file_obj: BinaryIO, bucket: str, filename: str, content_type: str) -> str:
        extension = os.path.splitext(filename)[1]
        today = datetime.now(timezone.utc).strftime('%Y/%m/%d')
        filename = f'{uuid.uuid4().hex}{extension}'
        key = os.path.join(today, filename)

        self.s3.upload_fileobj(
            Fileobj=file_obj,
            Bucket=bucket,
            Key=key,
            ExtraArgs={"ContentType": content_type, "ACL": "public-read"}
        )
        return f"{bucket}/{key}"

    async def multipart_video_upload(self, data: PerformerVideoUploadRequest) -> PerformerVideoUploadResponse:
        if data.key is None:
            today = datetime.now(timezone.utc).strftime('%Y/%m/%d')
            data.key = f'{today}/{uuid.uuid4()}.mp4'

        if data.upload_id is None:
            response = self.s3.create_multipart_upload(
                Bucket="videos",
                Key=data.key,
                ACL='public-read',  
            )
            data.upload_id = response['UploadId']
            print(">> upload id: ", data.upload_id)

        file_bytes = await data.file.read()
        bucket = "videos"
        response = self.s3.upload_part(
            Bucket=bucket,
            Key=data.key,
            PartNumber=data.part_number,
            UploadId=data.upload_id,
            Body=file_bytes
        )
        print(">> ETag: ", response['ETag'])
        return PerformerVideoUploadResponse(
            key=data.key,
            upload_id=data.upload_id,
            etag=response['ETag']
        )
    
    def complete_multipart_video_upload(self, data: PerformerVideoUploadCompleteRequest):
        bucket = "videos"
        parts = [part.model_dump() for part in data.parts]
        response = self.s3.complete_multipart_upload(
            Bucket=bucket,
            Key=data.key,
            UploadId=data.upload_id,
            MultipartUpload={'Parts': parts},  # Ensure parts is in the correct format
        )
        print(">> response:", response)
        return f"{bucket}/{data.key}"

    def get_presigned_url(self, bucket: str, key: str, expires_in: int = 3600):
        return self.s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": bucket, "Key": key},
            ExpiresIn=expires_in,
        )

    def delete_file(self, key: str):
        self.s3.delete_object(Bucket=self.bucket_name, Key=key)


    def compress_image_from_bytes(self, image_data: bytes) -> BinaryIO:
        image = Image.open(io.BytesIO(image_data))
        image = image.convert("RGB")
        image = image.resize((100, 100), Image.Resampling.LANCZOS)

        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')
        buffer.seek(0)
        return buffer


    def compress_image(self, data: Union[UploadFile, str]):
        image_data = None

        print(">> data type:", type(data))
        # Handle base64-encoded image
        if isinstance(data, str) and data.startswith('data:image'):
            # base64 encoded image - decode
            format, imgstr = data.split(';base64,') # format ~= data:image/X,
            # ext = format.split('/')[-1] # guess file extension
            image_data = base64.b64decode(imgstr)
        # Handle regular file upload
        elif isinstance(data, UploadFile):
            image_data = data.file.read()
            # ext = data.filename.split('.')[-1]
        else:
            raise Exception("Invalid media data")
        
        # Resize image to 100x100
        image = Image.open(io.BytesIO(image_data))
        image = image.convert("RGB")  # Ensure compatibility
        image = image.resize((100, 100), Image.Resampling.LANCZOS)

        # Save resized image to buffer
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')  # You can also use ext.upper() if needed
        buffer.seek(0)

        return buffer