from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


class SignInRequest(BaseModel):
    email: str
    password: str


class SignUpRequest(BaseModel):
    email: str = Field(..., max_length=254)
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=8)


class GoogleAuthRequest(BaseModel):
    token: str


class TokenPayload(BaseModel):
    user_id: int
    jti: Optional[str] = None
    jtv: int
    iat: int
    exp: int
    token_type: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AccessTokenResponse(BaseModel):
    access_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    uid: UUID
    email: str
    first_name: str
    last_name: str
    image: Optional[str] = None
    role: str
    auth_provider: str

    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserResponse
