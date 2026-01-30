from typing import Any, Dict, Optional

from dependency_injector.wiring import Provide, inject
from fastapi import Depends, HTTPException, status
from jose import jwt
from datetime import datetime, timezone
from pydantic import ValidationError

from app.core.config import configs
from app.core.container import Container
from app.core.security import ALGORITHM, JWTBearer
from app.models.user import User
from app.schemas.auth import RefreshTokenRequest, TokenPayload
from app.services.user_service import UserService


class NotAuthenticatedError(HTTPException):
    def __init__(self, detail: Any = None, headers: Optional[Dict[str, Any]] = None) -> None:
        super().__init__(status.HTTP_401_UNAUTHORIZED, detail, headers)


# ---------------------------------------------------------------------
# Token helpers
# ---------------------------------------------------------------------

async def get_current_user_id(
    token: str = Depends(JWTBearer()),
) -> TokenPayload:
    try:
        payload = jwt.decode(token, configs.SECRET_KEY, algorithms=ALGORITHM)
        token_data = TokenPayload(**payload)
        if token_data.token_type != "access" or token_data.exp < int(
            round(datetime.now(timezone.utc).timestamp())
        ):
            raise NotAuthenticatedError(detail="Invalid Bearer token")
        return token_data
    except (jwt.JWTError, ValidationError):
        raise NotAuthenticatedError(detail="Could not validate credentials")


# ---------------------------------------------------------------------
# User dependencies
# ---------------------------------------------------------------------

@inject
async def get_current_user(
    token_data: TokenPayload = Depends(get_current_user_id),
    service: UserService = Depends(Provide[Container.user_service]),
) -> User:
    current_user: User = await service.get_by_id(token_data.user_id)
    if not current_user:
        raise NotAuthenticatedError(detail="User not found")
    if current_user.jtv != token_data.jtv:
        raise NotAuthenticatedError(detail="Invalid Bearer token")
    return current_user


@inject
async def get_current_user_from_refresh(
    data: RefreshTokenRequest,
    service: UserService = Depends(Provide[Container.user_service]),
) -> User:
    try:
        payload = jwt.decode(data.refresh_token, configs.SECRET_KEY, algorithms=ALGORITHM)
        token_data = TokenPayload(**payload)
        if token_data.token_type != "refresh" or token_data.exp < int(
            round(datetime.now(timezone.utc).timestamp())
        ):
            raise NotAuthenticatedError("Invalid refresh token")
    except (jwt.JWTError, ValidationError):
        raise NotAuthenticatedError(detail="Could not validate credentials")

    current_user: User = await service.get_by_id(token_data.user_id)
    if not current_user:
        raise NotAuthenticatedError(detail="User not found")
    if current_user.jtv != token_data.jtv:
        raise NotAuthenticatedError(detail="Invalid refresh token")
    return current_user


def get_current_admin_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required"
        )
    return current_user
