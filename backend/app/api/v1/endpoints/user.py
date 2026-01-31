from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject

from app.core.container import Container
from app.core.dependencies import get_current_user, get_current_user_from_refresh
from app.models.user import User
from app.schemas.auth import (
    AuthResponse,
    GoogleAuthRequest,
    SignInRequest,
    SignUpRequest,
    TokenResponse,
)
from app.schemas.user import ChangePasswordRequest, UserOut, UserUpdateRequest
from app.services.user_service import UserService

router = APIRouter(tags=["Auth"])


@router.post("/sign-up", response_model=AuthResponse)
@inject
async def sign_up(
    data: SignUpRequest,
    service: UserService = Depends(Provide[Container.user_service]),
) -> AuthResponse:
    return await service.sign_up(data)


@router.post("/sign-in", response_model=AuthResponse)
@inject
async def sign_in(
    data: SignInRequest,
    service: UserService = Depends(Provide[Container.user_service]),
) -> AuthResponse:
    return await service.sign_in(data)


@router.post("/google-auth", response_model=AuthResponse)
@inject
async def google_auth(
    data: GoogleAuthRequest,
    service: UserService = Depends(Provide[Container.user_service]),
) -> AuthResponse:
    return await service.google_auth(data)


@router.post("/token/refresh", response_model=TokenResponse)
@inject
async def refresh_token(
    user: User = Depends(get_current_user_from_refresh),
    service: UserService = Depends(Provide[Container.user_service]),
) -> TokenResponse:
    return await service.refresh_token(user=user)


@router.get("/me", response_model=UserOut)
@inject
async def get_me(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
) -> UserOut:
    return await service.get_me(current_user)


@router.put("/me", response_model=UserOut)
@inject
async def update_me(
    data: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
) -> UserOut:
    return await service.update_me(current_user, data)


@router.post("/change-password", response_model=AuthResponse)
@inject
async def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
) -> AuthResponse:
    return await service.change_password(user=current_user, data=data)


@router.post("/logout")
@inject
async def logout(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    await service.logout(user=current_user)
    return {"detail": "Logged out"}
