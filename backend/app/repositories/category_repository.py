from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from psycopg2 import IntegrityError
import re
import unicodedata
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import AbstractContextManager
from typing import Callable
from sqlalchemy import func, case
from sqlalchemy.exc import NoResultFound
from app.models.category import Feature, FeatureOption, Occupation, Specialization, Service, specialization_feature_table
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy.orm import Session, with_loader_criteria
from app.repositories.base_repository import BaseRepository
from app.schemas.category import FeatureIn, FeatureOptionIn, OccupationIn, ServiceIn, SpecializationIn


class CategoryRepository(BaseRepository):
    # def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
    #     self.session_factory = session_factory

    async def get_all(self):
        query = select(Occupation).options(
            selectinload(Occupation.specializations)
        ).order_by(Occupation.rank)

        result = await self.session.execute(query)
        occupations = result.scalars().all()
        return occupations
    
    async def get_all_detailed(self):
        query = (
            select(Occupation)
            .options(
                selectinload(Occupation.specializations)
                    .selectinload(Specialization.services)
            )
            .options(
                with_loader_criteria(Service, lambda s: s.is_default == True)
            )
            .order_by(Occupation.rank)
        )
        result = await self.session.execute(query)
        occupations = result.scalars().all()
        return occupations
        
    async def get_occupations(self) -> List[Occupation]:
        query = (
            select(Occupation)
            .order_by(Occupation.rank)
        )
        result = await self.session.execute(query)
        occupations = result.scalars().all()
        return occupations
    
    async def get_occupation(self, id: int) -> Occupation:
        query = (
            select(Occupation)
            .filter(Occupation.id == id)
        )
        result = await self.session.execute(query)
        occupation = result.scalar_one_or_none()
        return occupation

        
    async def get_occupation_by_slug(self, slug: str) -> List[Occupation]:
        query = (
            select(Occupation)
            .filter(Occupation.slug == slug)
            .options(
                selectinload(Occupation.specializations)
            )
        )
        result = await self.session.execute(query)
        occupations = result.scalars().all()
        return occupations
        
    async def get_occupation_detailed(self, occupation_slug: str, specialization_slug: str) -> List[Occupation]:
        query = (
            select(Occupation)
            .join(Occupation.specializations)  # 👈 join needed for filtering specialization
            .filter(Occupation.slug == occupation_slug)
            # .filter(Specialization.slug == specialization_slug)
            .options(
                selectinload(Occupation.specializations)
                    .selectinload(Specialization.services)
            )
            .options(
                with_loader_criteria(Specialization, lambda s: s.slug == specialization_slug),
                with_loader_criteria(Service, lambda s: s.is_default == True)
            )
            .order_by(Occupation.rank)
        )
        result = await self.session.execute(query)
        occupations = result.scalars().all()
        return occupations
        
    async def get_occupation_specializations(self, id: int) -> Occupation:
        query = (
            select(Occupation)
            .filter(Occupation.id == id)
            .options(
                selectinload(Occupation.specializations).
                    selectinload(Specialization.features)
            )
            .order_by(Occupation.rank)
        )
        result = await self.session.execute(query)
        occupation = result.scalar_one_or_none()
        return occupation
        
    async def create_occupation(self, icon_url: str, data: OccupationIn) -> Occupation:
        occupation = Occupation(icon=icon_url, **data.model_dump())
        self.session.add(occupation)
        await self.session.flush()
        await self.session.refresh(occupation)
        return occupation
        
    async def update_occupation(self, occupation: Occupation, icon_url: Optional[str], data: OccupationIn) -> Occupation:
        # stmt = select(Occupation).where(Occupation.id == id)
        # result = await self.session.execute(stmt)
        # occupation = result.scalar_one_or_none()

        # if not occupation:
        #     raise NoResultFound(f"Occupation with ID {id} not found.")
        
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(occupation, field, value)
        
        if icon_url:
            occupation.icon = icon_url

        await self.session.flush()
        await self.session.refresh(occupation)
        return occupation
        
    async def delete_occupation(self, occupation: Occupation):
        # async with self.session_factory() as session:
        # stmt = select(Occupation).where(Occupation.id == id)
        # result = await self.session.execute(stmt)
        # occupation = result.scalar_one_or_none()

        # if not occupation:
        #     raise NoResultFound(f"Occupation with ID {id} not found.")

        await self.session.delete(occupation)
        # await session.commit()


    async def get_service_suggestions(self, query: str, language: str) -> List[Service]:
        # score = (
        #     0.7 * func.similarity(Service.name_az, query) 
        #     +
        #     0.3 * case((Service.name_az.ilike(f"{query}%"), 1), else_=0)
        # ).label("score")

        # stmt = (
        #     select(Service, score)
        #     .where(Service.name_az.ilike(f"%{query}%"))
        #     .order_by(score.desc())   # ✅ correct way
        #     .limit(10)
        # )

        # stmt = (
        #     select(Service, func.similarity(Service.name_az, query).label("score"))
        #     .where(Service.name_az.op("%")(query))  # equivalent to `name % query`
        #     .order_by(func.similarity(Service.name_az, query).desc())
        #     .limit(10)
        # )

        threshold = 0.3
        adjusted_threshold = max(0.1, min(threshold, 0.5 - len(query) * 0.05))

        if "ru" in language:
            stmt = (
                select(Service)
                .filter(func.similarity(Service.name_ru, query) > 0.3)
                .order_by(func.similarity(Service.name_ru, query).desc())
                .limit(10)
            )
        else:
            stmt = (
                select(Service)
                .filter(func.similarity(Service.name_az, query) > 0.3)
                .order_by(func.similarity(Service.name_az, query).desc())
                .limit(10)
            )

        result = await self.session.execute(stmt)
        return result.scalars().all()
    
    
    async def get_default_services(self, specialization_id: int) -> List[Service]:
        query = select(Service).where(
            Service.specialization_id == specialization_id,
            Service.is_default == True
        ).order_by(Service.rank)
        result = await self.session.execute(query)
        services = result.scalars().all()
        return services

    async def get_popular_services(self) -> List[Service]:
        query = select(Service).where(
            Service.is_default == True,
            Service.image.is_not(None),
            Service.image != ''
        ).order_by(Service.rank)
        result = await self.session.execute(query)
        services = result.scalars().all()
        return services
    
    def slugify(self, value: str) -> str:
        # Normalize unicode characters
        value = unicodedata.normalize('NFKD', value)
        value = value.encode('ascii', 'ignore').decode('ascii')
        # Convert to lowercase
        value = value.lower()
        # Replace any non-word characters or whitespace with hyphens
        value = re.sub(r'[^\w\s-]', '', value)
        value = re.sub(r'[\s_-]+', '-', value).strip('-')
        return value

    async def get_or_create_service(self, name: str, specialization_id: int, language: str):
        if "ru" in language:
            stmt = select(Service).where(
                Service.name_ru == name,
                Service.specialization_id == specialization_id
            )
        else:
            stmt = select(Service).where(
                Service.name_az == name,
                Service.specialization_id == specialization_id
            )
        result = await self.session.execute(stmt)
        service = result.scalar_one_or_none()

        if service:
            return service, False  # existing object

        # Create new one
        slug = self.slugify(name)
        service = Service(
            name_ru=name,
            name_az=name,
            slug=slug,
            specialization_id=specialization_id,
        )
        self.session.add(service)
        await self.session.flush()
        return service, True 
        # try:
        #     await self.session.flush()
        #     return service, True 
        # except IntegrityError:
        #     await self.session.rollback()
        #     # Race condition: someone created the same object concurrently
        #     result = await self.session.execute(stmt)
        #     return result.scalar_one(), False

    
    async def get_specialization(self, id: int) -> Specialization:
        stmt = (
            select(Specialization)
            .where(Specialization.id == id)
            .options(
                selectinload(Specialization.features),
                selectinload(Specialization.services)
            )
        )
        result = await self.session.execute(stmt)
        specialization = result.scalar_one_or_none()
        return specialization


    async def get_specialization_features(self, specialization_id: int) -> List[Feature]:
        stmt = (
            select(Feature)
            .join(specialization_feature_table)
            .filter(specialization_feature_table.c.specialization_id == specialization_id)
            .options(selectinload(Feature.options))  # if you want to include related data
        )
        result = await self.session.execute(stmt)
        features = result.scalars().all()
        return features
        
    async def set_specialization_features(self, specialization: Specialization, features: List[int]):
        # result = await self.session.execute(
        #     select(Specialization)
        #     .options(selectinload(Specialization.features))
        #     .where(Specialization.id == id)
        # )
        # specialization = result.scalar_one_or_none()
        # if not specialization:
        #     raise NoResultFound(f"Specialization with ID {id} not found")

        # Fetch new feature objects
        if features:
            feature_result = await self.session.execute(
                select(Feature).where(Feature.id.in_(features))
            )
            features = feature_result.scalars().all()
        else:
            features = []

        # Set new features (overwrite existing)
        specialization.features = features
        await self.session.flush()

    async def get_specializations_by_id(self, ids: List[int]) -> List[Specialization]:
        query = (
            select(Specialization)
            .filter(Specialization.id.in_(ids))
        )
        result = await self.session.execute(query)
        specializations = result.scalars().all()
        return specializations
        
    async def get_specialization_detailed(self, id: int) -> Specialization:
        query = (
            select(Specialization)
            .filter(Specialization.id == id)
            .options(
                selectinload(Specialization.services),
                selectinload(Specialization.features)
            )
        )
        result = await self.session.execute(query)
        specialization = result.scalar_one_or_none()
        return specialization
    
    async def create_specialization(self, data: SpecializationIn) -> Specialization:
        specialization = Specialization(**data.model_dump())
        self.session.add(specialization)
        await self.session.flush()
        await self.session.refresh(specialization)
        return specialization
        

    async def update_specialization(self, specialization: Specialization, data: SpecializationIn) -> Specialization:
        # stmt = select(Specialization).where(Specialization.id == id).options(
        #     selectinload(Specialization.services),
        #     selectinload(Specialization.features)
        # )
        # result = await self.session.execute(stmt)
        # specialization = result.scalar_one_or_none()

        # if not specialization:
        #     raise NoResultFound(f"Specialization with ID {id} not found.")
        
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(specialization, field, value)

        await self.session.flush()
        await self.session.refresh(specialization)
        return specialization
        
    async def delete_specialization(self, specialization: Specialization): 
        # stmt = select(Specialization).where(Specialization.id == id)
        # result = await self.session.execute(stmt)
        # specialization = result.scalar_one_or_none()

        # if not specialization:
        #     raise NoResultFound(f"Specialization with ID {id} not found.")

        await self.session.delete(specialization)
        # await session.commit()

    async def get_specialization_services(self, specialization_id: int) -> List[Service]:
        stmt = (
            select(Service)
            .where(Service.specialization_id == specialization_id, Service.is_default == True)
            .order_by(Service.rank)
        )
        result = await self.session.execute(stmt)
        services = result.scalars().all()
        return services

    async def get_service(self, id: int) -> Service:
        stmt = select(Service).where(Service.id == id)
        result = await self.session.execute(stmt)
        service = result.scalar_one_or_none()
        return service
        
    async def create_service(self, data: ServiceIn) -> Service:
        service = Service(**data.model_dump())
        self.session.add(service)
        await self.session.flush()
        await self.session.refresh(service)
        return service
        
    async def update_service(self, service: Service, data: ServiceIn) -> Service:
        # stmt = select(Service).where(Service.id == id)
        # result = await self.session.execute(stmt)
        # service = result.scalar_one_or_none()

        # if not service:
        #     raise NoResultFound(f'Service with ID {id} not found')

        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(service, field, value)

        await self.session.flush()
        await self.session.refresh(service)
        return service
        
    async def delete_service(self, service: Service):
        # stmt = select(Service).where(Service.id == id)
        # result = await self.session.execute(stmt)
        # service = result.scalar_one_or_none()

        # if not service:
        #     raise NoResultFound(f"Service with ID {id} not found.")

        await self.session.delete(service)

    async def get_features(self) -> List[Feature]:
        query = (
            select(Feature)
            .order_by(Feature.id)
        )
        result = await self.session.execute(query)
        features = result.scalars().all()
        return features
        
    async def get_feature(self, id: int) -> Feature:
        query = (
            select(Feature).where(Feature.id == id)
            .options(
                selectinload(Feature.options),
            )
        )
        result = await self.session.execute(query)
        feature = result.scalar_one_or_none()
        return feature
        
    async def create_feature(self, data: FeatureIn) -> Feature:
        feature = Feature(**data.model_dump())
        self.session.add(feature)
        await self.session.flush()
        await self.session.refresh(feature)
        return feature
        
    async def update_feature(self, feature: Feature, data: FeatureIn) -> Feature:
        # stmt = select(Feature).where(Feature.id == id)
        # result = await self.session.execute(stmt)
        # feature = result.scalar_one_or_none()

        # if not feature:
        #     raise NoResultFound(f"Feature with ID {id} not found.")
        
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(feature, field, value)

        await self.session.flush()
        await self.session.refresh(feature)
        return feature
        
    async def delete_feature(self, feature: Feature):
        # stmt = select(Feature).where(Feature.id == id)
        # result = await self.session.execute(stmt)
        # feature = result.scalar_one_or_none()

        # if not feature:
        #     raise NoResultFound(f"Feature with ID {id} not found.")

        await self.session.delete(feature)
        # await session.commit()

    async def get_feature_option(self, id: int) -> FeatureOption:
        query = (
            select(FeatureOption)
            .filter(FeatureOption.id == id)
        )
        result = await self.session.execute(query)
        option = result.scalar_one_or_none()
        return option
        
    async def create_feature_option(self, data: FeatureOptionIn) -> FeatureOption:
        option = FeatureOption(**data.model_dump())
        self.session.add(option)
        await self.session.flush()
        await self.session.refresh(option)
        return option
        
    async def update_feature_option(self, option: FeatureOption, data: FeatureOptionIn) -> FeatureOption:
        # stmt = select(FeatureOption).where(FeatureOption.id == id)
        # result = await self.session.execute(stmt)
        # option = result.scalar_one_or_none()

        # if not option:
        #     raise NoResultFound(f"Feature Option with ID {id} not found.")
    
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(option, field, value)

        await self.session.flush()
        await self.session.refresh(option)
        return option
        
    async def delete_feature_option(self, option: FeatureOption):
        # stmt = select(FeatureOption).where(FeatureOption.id == id)
        # result = await self.session.execute(stmt)
        # option = result.scalar_one_or_none()

        # if not option:
        #     raise NoResultFound(f"Feature Option with ID {id} not found.")

        await self.session.delete(option)
        # await session.commit()
        