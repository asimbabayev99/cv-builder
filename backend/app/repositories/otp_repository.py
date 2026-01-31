from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from sqlalchemy import delete, update, desc
from app.models.city import City
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload
from pydantic import UUID4
from sqlalchemy.orm import Session
import uuid
from datetime import datetime, timezone, timedelta
from app.models.user import OTPActionEnum, OTPSession, PhoneOTP
from app.schemas.otp import OTPFilterParams, OTPRequest, OTPSessionFilterParams
from .base_repository import BaseRepository
from app.core.config import configs
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination import Params


class OTPRepository(BaseRepository):

    async def get(self, phone: str, action: str) -> PhoneOTP:
        query = select(PhoneOTP).filter(PhoneOTP.phone == phone, PhoneOTP.action == action)
        result = await self.session.execute(query)
        phone_otp = result.scalars().first()
        return phone_otp
    
    async def get_otps(self, filters: OTPFilterParams):
        stmt = (
            select(PhoneOTP)
            .order_by(desc(PhoneOTP.created_at))
        )
        if filters.action:
            stmt = stmt.where(PhoneOTP.action == filters.action)
        if filters.phone:
            stmt = stmt.where(PhoneOTP.phone.ilike(f"%{filters.phone}%"))
        
        paginationParams = Params(page=filters.page, size=20)
        return await apaginate(self.session, stmt, params=paginationParams)


    async def get_otp_sessions(self, filters: OTPSessionFilterParams):
        stmt = (
            select(OTPSession)
            .order_by(desc(OTPSession.created_at))
        )
        if filters.action:
            stmt = stmt.where(OTPSession.action == filters.action)
        if filters.phone:
            stmt = stmt.where(OTPSession.phone.ilike(f"%{filters.phone}%"))
        
        paginationParams = Params(page=filters.page, size=20)
        return await apaginate(self.session, stmt, params=paginationParams)
    
        
    async def increment_fails(self, phone_otp: PhoneOTP):
        fails = phone_otp.fails + 1
        query = update(PhoneOTP).where(PhoneOTP.id == phone_otp.id).values(fails=fails)
        await self.session.execute(query)
        await self.session.flush()

    async def use_otp(self, phone_otp: PhoneOTP):
        query = update(PhoneOTP).where(PhoneOTP.id == phone_otp.id).values(used=True)     
        await self.session.execute(query)
        await self.session.flush()

    async def get_session(self, phone: str, session_id: str) -> OTPSession:
        query = select(OTPSession).filter(
            OTPSession.phone == phone, 
            OTPSession.session == session_id,
            OTPSession.used == False,
            OTPSession.expire_at > datetime.now(timezone.utc)
        )
        result = await self.session.execute(query)
        otp_session = result.scalars().first()
        return otp_session

    async def create_session(self, phone: str, action: str) -> OTPSession:
        uid = str(uuid.uuid4())
        session_obj = OTPSession(
            session=uid,
            phone=phone,
            action=action,
            expire_at=datetime.now(timezone.utc) + timedelta(seconds=configs.OTP_SESSION_TIME_LIMIT)
        )
        self.session.add(session_obj)
        await self.session.flush()
        await self.session.refresh(session_obj)
        return session_obj
    

    async def use_session(self, id: int):
        query = update(OTPSession).where(OTPSession.id == id).values(used=True)
        await self.session.execute(query)
        await self.session.flush()
    
    async def delete_otp(self, id: int):
        query = delete(PhoneOTP).where(PhoneOTP.id == id)
        await self.session.execute(query)
        await self.session.flush()
        
    async def delete_session(self, id: int):
        query = delete(OTPSession).where(OTPSession.id == id)
        await self.session.execute(query)
        await self.session.flush()

    async def create(self, data: OTPRequest) -> PhoneOTP:
        otp = 999999
        phone_otp = PhoneOTP(
            otp=otp,
            phone=data.phone,
            action=data.action,
            expire_at=datetime.now(timezone.utc) + timedelta(seconds=configs.OTP_TIME_LIMIT),
        )
        self.session.add(phone_otp)
        await self.session.flush()
        await self.session.refresh(phone_otp)  # refresh to get ID and updated state
        return phone_otp