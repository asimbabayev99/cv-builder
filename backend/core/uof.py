from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.user_repository import UserRepository


class UnitOfWork:
    def __init__(self, session_factory):
        self.session_factory = session_factory
        self.session: AsyncSession = None
        self._users = None

    async def __aenter__(self):
        self._session_cm = self.session_factory()
        self.session = await self._session_cm.__aenter__()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            await self.session.rollback()
        else:
            await self.session.commit()
        await self._session_cm.__aexit__(exc_type, exc_val, exc_tb)

    @property
    def users(self) -> UserRepository:
        if self._users is None:
            self._users = UserRepository(self.session)
        return self._users
