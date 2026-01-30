from dependency_injector import containers, providers
from redis.asyncio import Redis

from app.core.config import configs
from app.core.database import Database
from app.core.uof import UnitOfWork
from app.services.cache_service import CacheService
from app.services.user_service import UserService
from app.services.cv_service import CvService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.api.v1.endpoints.home",
            "app.api.v1.endpoints.user",
            "app.api.v1.endpoints.cv",
            "app.core.dependencies",
        ]
    )

    db = providers.Singleton(Database)
    session_factory = providers.Resource(db.provided.session)

    redis_client = providers.Singleton(
        Redis,
        host=configs.REDIS_HOST,
        port=configs.REDIS_PORT,
        decode_responses=True,
    )
    cache_service = providers.Singleton(
        CacheService,
        redis_client=redis_client,
    )

    unit_of_work = providers.Factory(
        UnitOfWork,
        session_factory=session_factory,
    )

    user_service = providers.Factory(
        UserService,
        uow_factory=unit_of_work.provider,
    )

    cv_service = providers.Factory(
        CvService,
        uow_factory=unit_of_work.provider,
    )
