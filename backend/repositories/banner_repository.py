from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from app.models.performer import Performer
from app.schemas.banner import BannerFilterParams, BannerIn
from sqlalchemy import or_, desc
from app.models.banner import Banner, BannerStatusEnum
from app.models.city import City
from sqlalchemy.future import select
from sqlalchemy import delete
from sqlalchemy.orm import selectinload, joinedload
from pydantic import UUID4
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from .base_repository import BaseRepository
from datetime import datetime, timezone
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination import Params


class BannerRepository(BaseRepository):

    async def get_all(self, user: Optional[User]):
        stmt = select(Banner).where(
            Banner.active == True, 
            Banner.status == BannerStatusEnum.APPROVED,
            Banner.expire_at >= datetime.now(timezone.utc)
        ).options(
            selectinload(Banner.performer)
                .selectinload(Performer.city)
        )
        if user and user.performer:
            stmt = stmt.where(Banner.targets.any("performer"))
        elif user:
            stmt = stmt.where(Banner.targets.any("user"))
        else:
            stmt = stmt.where(Banner.targets.any("anonym"))
        result = await self.session.execute(stmt)
        banners = result.scalars().all()
        return banners
    

    async def get_banners(self, filters: BannerFilterParams):
        stmt = (
            select(Banner)
            .order_by(desc(Banner.created_at))
            .options(
                selectinload(Banner.performer)
                    .selectinload(Performer.city),
                selectinload(Banner.performer)
                    .selectinload(Performer.user)
            )
        )

        if filters.active:
            stmt = stmt.where(Banner.active == True)
        if filters.types:
            stmt = stmt.where(Banner.type.in_(filters.types))
        if filters.target:
            stmt = stmt.where(Banner.targets.any(filters.target))
        if filters.status:
            stmt = stmt.where(Banner.status == filters.status)
        if filters.performer_id:
            stmt = stmt.where(Banner.performer_id == filters.performer_id)

        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def get_banner(self, uid: UUID4) -> Optional[Banner]:
        stmt = select(Banner).where(
            Banner.uid == uid, 
        )
        result = await self.session.execute(stmt)
        banner = result.scalar_one_or_none()
        return banner
    

    async def get_banner_detailed(self, id: int) -> Optional[Banner]:
        stmt = (
            select(Banner)
            .where(Banner.id == id)
            .options(
                selectinload(Banner.performer)
                    .selectinload(Performer.city),
                selectinload(Banner.performer)
                    .selectinload(Performer.user)
            )
        )
        result = await self.session.execute(stmt)
        banner = result.scalar_one_or_none()
        return banner
    

    async def create_banner(self, image: str, data: BannerIn) -> Banner:
        banner = Banner(
            image=image,
            status=data.status,
            type=data.type,
            targets=data.targets,
            active=data.active,
            expire_at=data.expire_at
        )
        self.session.add(banner)
        await self.session.flush()
        await self.session.refresh(banner)
        return banner
    
    async def update_banner(self, banner: Banner, image: Optional[str], data: BannerIn) -> Banner:
        data = data.model_dump(exclude_unset=True)
        if "image" in data:
            del data['image']

        for field, value in data.items():
            setattr(banner, field, value)
        
        if image:
            banner.image = image

        await self.session.flush()
        await self.session.refresh(banner)
        return banner 


    async def add_banner_view(self, banner: Banner, user: Optional[User]):
        banner.views += 1
        self.session.add(banner)
        await self.session.flush()


    async def add_banner_click(self, banner: Banner, user: Optional[User]):
        banner.clicks += 1
        self.session.add(banner)
        await self.session.flush()

    
    async def delete_banner(self, id: int):
        stmt = (
            delete(Banner)
            .where(Banner.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()