from typing import Awaitable, Callable

import httpx
from fastapi import HTTPException, status
from loguru import logger

from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
)
from app.core.uof import UnitOfWork
from app.models.user import User
from app.schemas.auth import (
    AuthResponse,
    GoogleAuthRequest,
    SignInRequest,
    SignUpRequest,
    TokenResponse,
    UserResponse,
)
from app.schemas.user import ChangePasswordRequest, UserUpdateRequest
from .base_service import BaseService


class UserService(BaseService):
    def __init__(
        self,
        uow_factory: Callable[[], Awaitable[UnitOfWork]],
    ):
        self.uow_factory = uow_factory

    def _build_auth_response(self, user: User) -> AuthResponse:
        access_token = create_access_token(user_id=user.id, jtv=user.jtv)
        refresh_token = create_refresh_token(user_id=user.id, jtv=user.jtv)
        return AuthResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserResponse.model_validate(user),
        )

    # ------------------------------------------------------------------
    # Auth
    # ------------------------------------------------------------------

    async def sign_up(self, data: SignUpRequest) -> AuthResponse:
        async with self.uow_factory() as uow:
            if await uow.users.email_exists(data.email):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already in use",
                )
            user = await uow.users.create(data)
            return self._build_auth_response(user)

    async def sign_in(self, data: SignInRequest) -> AuthResponse:
        async with self.uow_factory() as uow:
            user = await uow.users.get_by_email(data.email)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid email or password",
                )
            if not user.password:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="This account uses Google sign-in",
                )
            if not verify_password(
                plain_password=data.password, hashed_password=user.password
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid email or password",
                )
            if not user.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Account is deactivated",
                )
            return self._build_auth_response(user)

    async def google_auth(self, data: GoogleAuthRequest) -> AuthResponse:
        # Verify Google token
        google_user = await self._verify_google_token(data.token)

        async with self.uow_factory() as uow:
            google_id = google_user["sub"]
            email = google_user["email"]

            # 1. Existing user by google_id
            user = await uow.users.get_by_google_id(google_id)
            if user:
                return self._build_auth_response(user)

            # 2. Existing user by email — link google_id
            user = await uow.users.get_by_email(email)
            if user:
                user = await uow.users.link_google_id(user, google_id)
                return self._build_auth_response(user)

            # 3. Create new Google user
            user = await uow.users.create_google_user(
                email=email,
                first_name=google_user.get("given_name", ""),
                last_name=google_user.get("family_name", ""),
                google_id=google_id,
                image=google_user.get("picture"),
            )
            return self._build_auth_response(user)

    async def refresh_token(self, user: User) -> TokenResponse:
        access_token = create_access_token(user_id=user.id, jtv=user.jtv)
        refresh_token = create_refresh_token(user_id=user.id, jtv=user.jtv)
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )

    # ------------------------------------------------------------------
    # Profile
    # ------------------------------------------------------------------

    async def get_me(self, user: User) -> UserResponse:
        return UserResponse.model_validate(user)

    async def update_me(self, user: User, data: UserUpdateRequest) -> UserResponse:
        update_data = data.model_dump(exclude_unset=True)
        async with self.uow_factory() as uow:
            user = await uow.users.update_user(user, update_data)
            return UserResponse.model_validate(user)

    async def change_password(
        self, user: User, data: ChangePasswordRequest
    ) -> AuthResponse:
        if not user.password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This account uses Google sign-in",
            )
        if not verify_password(
            plain_password=data.current_password, hashed_password=user.password
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid current password",
            )
        async with self.uow_factory() as uow:
            user = await uow.users.update_password(
                user=user, new_password=data.new_password
            )
            return self._build_auth_response(user)

    async def logout(self, user: User) -> None:
        async with self.uow_factory() as uow:
            await uow.users.increment_jtv(user)

    # ------------------------------------------------------------------
    # Helpers used by dependencies
    # ------------------------------------------------------------------

    async def get_by_id(self, id: int) -> User:
        async with self.uow_factory() as uow:
            return await uow.users.get_by_id(id)

    # ------------------------------------------------------------------
    # Google token verification
    # ------------------------------------------------------------------

    @staticmethod
    async def _verify_google_token(token: str) -> dict:
        url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
        if resp.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google token",
            )
        data = resp.json()
        if "sub" not in data or "email" not in data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google token payload",
            )
        return data
