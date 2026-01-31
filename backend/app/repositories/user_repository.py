import uuid
from typing import Optional

from sqlalchemy import exists, update
from sqlalchemy.future import select

from app.core.security import get_password_hash
from app.models.user import AuthProvider, User
from app.schemas.auth import SignUpRequest
from .base_repository import BaseRepository


class UserRepository(BaseRepository):

    async def get_by_id(self, id: int) -> Optional[User]:
        query = select(User).where(User.id == id)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_by_email(self, email: str) -> Optional[User]:
        query = select(User).where(User.email == email)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_by_google_id(self, google_id: str) -> Optional[User]:
        query = select(User).where(User.google_id == google_id)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def email_exists(self, email: str) -> bool:
        query = select(exists().where(User.email == email))
        result = await self.session.execute(query)
        return result.scalar()

    async def create(self, data: SignUpRequest) -> User:
        new_user = User(
            uid=uuid.uuid4(),
            email=data.email,
            first_name=data.first_name,
            last_name=data.last_name,
            password=get_password_hash(data.password),
            auth_provider=AuthProvider.LOCAL,
        )
        self.session.add(new_user)
        await self.session.flush()
        await self.session.refresh(new_user)
        return new_user

    async def create_google_user(
        self,
        email: str,
        first_name: str,
        last_name: str,
        google_id: str,
        image: Optional[str] = None,
    ) -> User:
        new_user = User(
            uid=uuid.uuid4(),
            email=email,
            first_name=first_name,
            last_name=last_name,
            google_id=google_id,
            image=image,
            auth_provider=AuthProvider.GOOGLE,
        )
        self.session.add(new_user)
        await self.session.flush()
        await self.session.refresh(new_user)
        return new_user

    async def update_user(self, user: User, data: dict) -> User:
        if data:
            stmt = update(User).where(User.id == user.id).values(**data)
            await self.session.execute(stmt)
            await self.session.flush()
            for key, value in data.items():
                setattr(user, key, value)
        return user

    async def update_password(self, user: User, new_password: str) -> User:
        hashed_password = get_password_hash(new_password)
        jtv = user.jtv + 1
        stmt = update(User).where(User.id == user.id).values(
            password=hashed_password, jtv=jtv
        )
        await self.session.execute(stmt)
        await self.session.flush()
        user.password = hashed_password
        user.jtv = jtv
        return user

    async def increment_jtv(self, user: User) -> User:
        jtv = user.jtv + 1
        stmt = update(User).where(User.id == user.id).values(jtv=jtv)
        await self.session.execute(stmt)
        await self.session.flush()
        user.jtv = jtv
        return user

    async def link_google_id(self, user: User, google_id: str) -> User:
        stmt = (
            update(User)
            .where(User.id == user.id)
            .values(google_id=google_id, auth_provider=AuthProvider.GOOGLE)
        )
        await self.session.execute(stmt)
        await self.session.flush()
        user.google_id = google_id
        user.auth_provider = AuthProvider.GOOGLE
        return user

    async def deactivate_user(self, user: User) -> User:
        stmt = update(User).where(User.id == user.id).values(is_active=False)
        await self.session.execute(stmt)
        await self.session.flush()
        user.is_active = False
        return user
