import os
from typing import List, ClassVar

from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Find .env relative to this file (backend/.env) regardless of CWD
_env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(_env_path)

ENV: str = ""


class Configs(BaseSettings):
    # base
    ENV: str = os.getenv("ENV", "dev")
    API: str = "/api"
    API_V1_STR: str = "/api/v1"
    API_V2_STR: str = "/api/v2"
    PROJECT_NAME: str = "fca-api"
    ENV_DATABASE_MAPPER: dict = {
        "prod": "fca",
        "stage": "stage-fca",
        "dev": "cv_builder",
        "test": "test-fca",
    }
    DB_ENGINE_MAPPER: dict = {
        "postgresql": "postgresql+asyncpg",
        "mysql": "mysql+pymysql",
    }

    PROJECT_ROOT: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    # REDIS Configs
    REDIS_HOST: str = os.environ.get("REDIS_HOST", "127.0.0.1")
    REDIS_PORT: int = os.environ.get("REDIS_PORT", 6379)


    # CELERY Configs
    CELERY_BROKER_URL: str = os.environ.get("CELERY_BROKER_URL", "redis://127.0.0.1:6379/0")
    CELERY_RESULT_BACKEND: str = os.environ.get("CELERY_RESULT_BACKEND", "redis://127.0.0.1:6379/0")

    # date
    DATETIME_FORMAT: str = "%Y-%m-%dT%H:%M:%S"
    DATE_FORMAT: str = "%Y-%m-%d"

    # otp
    OTP_TIME_LIMIT: int = 120 # 2 minutes
    OTP_FAIL_LIMIT: int = 3
    OTP_SESSION_TIME_LIMIT: int = 60 * 60 # 1 hour

    # auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 60 minutes
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 365

    # aws s3
    AWS_ACCESS_KEY_ID: str = os.getenv('AWS_ACCESS_KEY_ID', '')
    AWS_SECRET_ACCESS_KEY: str = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME: str = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME: str = os.getenv('AWS_S3_REGION_NAME')
    AWS_S3_ENDPOINT_URL: str = os.getenv('AWS_S3_ENDPOINT_URL') 
    AWS_S3_CUSTOM_DOMAIN: str = os.getenv('AWS_S3_CUSTOM_DOMAIN') 
    AWS_DEFAULT_ACL: str = os.getenv('AWS_DEFAULT_ACL')
    # AWS_S3_CUSTOM_DOMAIN: str = f"{AWS_STORAGE_BUCKET_NAME}.{AWS_S3_ENDPOINT_URL.split('//')[1]}"

    # Media settings (optional, but recommended)
    MEDIA_URL: str = f'https://{AWS_S3_CUSTOM_DOMAIN}/'

    # CORS - Configure allowed origins via environment variable
    # In production, set CORS_ORIGINS to comma-separated list of allowed domains
    BACKEND_CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "*").split(",")

    # Sentry configuration - move DSN to environment for security
    SENTRY_DSN: str = os.getenv("SENTRY_DSN", "")
    SENTRY_TRACES_SAMPLE_RATE: float = float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.1"))
    SENTRY_SEND_PII: bool = os.getenv("SENTRY_SEND_PII", "false").lower() == "true"

    # database
    DB: str = os.getenv("DB", "postgresql")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT", "3306")
    DB_ENGINE: str = DB_ENGINE_MAPPER.get(DB, "postgresql")

    DATABASE_URI_FORMAT: str = "{db_engine}://{user}:{password}@{host}:{port}/{database}"

    DATABASE_URI: ClassVar[str] = "{db_engine}://{user}:{password}@{host}:{port}/{database}".format(
        db_engine=DB_ENGINE,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=ENV_DATABASE_MAPPER[ENV],
    )

    # find query
    PAGE: ClassVar[int] = 1
    PAGE_SIZE: ClassVar[int] = 20
    ORDERING: ClassVar[str] = "-id"

    class Config:
        case_sensitive = True


class TestConfigs(Configs):
    ENV: str = "test"


configs = Configs()

if ENV == "prod":
    pass
elif ENV == "stage":
    pass
elif ENV == "test":
    setting = TestConfigs()