from contextlib import AbstractContextManager
from typing import Any, Callable, Type, TypeVar
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload


class BaseRepository:
    # def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
    #     self.session_factory = session_factory

    def __init__(self, session: AsyncSession): 
        self.session = session