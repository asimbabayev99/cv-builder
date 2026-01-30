from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.core.config import configs

from contextlib import AbstractContextManager, contextmanager, asynccontextmanager
from typing import Any, Generator, AsyncGenerator

from sqlalchemy import create_engine, orm
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import Session

# # Use asyncpg in the database URL
# DATABASE_URL = settings.database_url

# engine = create_async_engine(DATABASE_URL, echo=False)
# async_session = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Base = declarative_base()

# # Dependency
# async def get_db():
#     async with async_session() as session:
#         yield session




class Database:
    def __init__(self) -> None:
        self._engine = create_async_engine(configs.DATABASE_URI, echo=False)
        self._async_session_factory = async_sessionmaker(
            bind=self._engine,
            autoflush=False,
            expire_on_commit=False,
            class_=AsyncSession
        )
    

    @asynccontextmanager
    async def session(self) -> AsyncGenerator[AsyncSession, None]:
        async with self._async_session_factory() as session:
            try:
                yield session
            except Exception:
                await session.rollback()
                raise
            finally:
                await session.close()