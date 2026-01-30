from typing import Awaitable, Callable, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.uof import UnitOfWork
from app.models.category import Occupation, Service, Specialization
from app.models.user import User
from app.repositories.banner_repository import BannerRepository
from app.repositories.category_repository import CategoryRepository
from app.schemas.category import OccupationDetailedResponse, OccupationResponse
from app.schemas.city import CityResponse
from app.repositories.city_repository import CityRepository
from fastapi import Request
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload

from app.schemas.home import HomeResponse, ServiceSuggestionResponse
from app.services.cache_service import CacheService
from .base_service import BaseService


class HomeService(BaseService):
    def __init__(self, uow_factory: Callable[[], Awaitable[UnitOfWork]], cache_service: CacheService):
        self.uow_factory = uow_factory
        self.cache_service = cache_service

    async def get_data(self, user: User, language: str) -> HomeResponse:
        async with self.uow_factory() as uow:
            occupations = await uow.categories.get_all_detailed()
            categories = [
                OccupationResponse(
                    **occupation.__dict__,
                    accept_language=language
                )
                for occupation in occupations
            ]
            banners = await uow.banners.get_all(user=user)
            popular_services = await uow.categories.get_popular_services()
            
            return HomeResponse(
                occupations=categories,
                banners=banners,
                popular_services=popular_services,
            )
    
    async def get_search_hints(self, query: str, language: str) -> List[Service]:
        async with self.uow_factory() as uow:
            occupations = await uow.categories.get_all()
            categories = [
                OccupationResponse(
                    **occupation.__dict__,
                    accept_language=language
                )
                for occupation in occupations
            ]
            services = await uow.categories.get_service_suggestions(query=query, language=language)
            
            return ServiceSuggestionResponse(
                occupations=categories,
                services=services,
                accept_language=language
            )

