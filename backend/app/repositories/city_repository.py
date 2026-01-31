from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from app.models.city import City
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy.exc import NoResultFound
from pydantic import UUID4
from sqlalchemy.orm import Session

from app.schemas.city import CityIn
from .base_repository import BaseRepository


class CityRepository(BaseRepository):

    async def get_all(self) -> List[City]:
        query = select(City).order_by(City.id)
        result = await self.session.execute(query)
        cities = result.scalars().all()
        return cities
        
    async def get_city(self, id: int) -> City:
        query = select(City).filter(City.id == id)
        result = await self.session.execute(query)
        city = result.scalar_one_or_none()
        return city

    async def create_city(self, data: CityIn) -> City:
        city = City(**data.model_dump())
        self.session.add(city)
        await self.session.flush()
        await self.session.refresh(city)
        return city

    async def update_city(self, city: City, data: CityIn) -> City:
        # stmt = select(City).where(City.id == id)
        # result = await session.execute(stmt)
        # city = result.scalar_one_or_none()

        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(city, field, value)

        await self.session.flush()
        await self.session.refresh(city)
        return city

    async def delete_city(self, city: City):
        await self.session.delete(city)
        await self.session.flush()