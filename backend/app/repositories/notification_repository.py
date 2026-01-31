from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from app.models.user import User
from sqlalchemy import func, update, desc
from app.models.city import City
from sqlalchemy.future import select
from sqlalchemy import delete
from sqlalchemy.orm import selectinload, joinedload
from pydantic import UUID4
from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification import NewNotificationsCountOut, NotificationFilterParams
from .base_repository import BaseRepository
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination import Params


class NotificationRepository(BaseRepository):
    
    async def get_by_uid(self, uid: UUID4) -> Notification:
        query = select(Notification).where(Notification.uid == uid)
        result = await self.session.execute(query)
        notification = result.scalar_one_or_none()
        return notification
        

    async def get_notifications(self, user_id: int, cursor: int):
        stmt = select(Notification).where(Notification.user_id == user_id)
        if cursor:
            stmt = stmt.where(Notification.create_date < cursor)

        stmt = stmt.order_by(Notification.id.desc()).limit(20)
        result = await self.session.execute(stmt)
        notifications = result.scalars().all()
        return notifications
    

    async def get_all_notifications(self, filters: NotificationFilterParams):
        stmt = (
            select(Notification)
            .order_by(desc(Notification.created_at))
        )

        if filters.q:
            stmt = stmt.join(Notification.user).where(User.username.ilike(f"%{filters.q}%")) 
        else:
            stmt = stmt.join(Notification.user)

        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def delete_notification(self, id: int):
        stmt = (
            delete(Notification)
            .where(Notification.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()
        
    
    async def get_new_notifications_count(self, user_id: int) -> int:
        stmt = select(func.count()).select_from(Notification).where(
            Notification.user_id == user_id,
            Notification.seen == False
        )
        result = await self.session.execute(stmt)
        count = result.scalar_one_or_none()
        print(">> repo count: ", count)
        return 0 if not count else count
        
    
    async def mark_as_seen(self, id: int): 
        stmt = (
            update(Notification)
            .where(Notification.id == id)
            .values(seen=True)
        )
        await self.session.execute(stmt)
        await self.session.flush()