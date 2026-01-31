from datetime import datetime, timedelta, timezone
from typing import Tuple
import uuid
from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from passlib.context import CryptContext

from app.core.config import configs
from app.core.exceptions import AuthError
from app.schemas.auth import RefreshTokenRequest, TokenPayload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"


def create_access_token(
        user_id: int, jtv: int, 
        expires_delta: timedelta = None
) -> str:
    if expires_delta:
        access_expire = datetime.now(timezone.utc) + expires_delta
    else:
        access_expire = datetime.now(timezone.utc) + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "user_id": user_id,
        "iat": int(round(datetime.now().timestamp())),
        "jti": uuid.uuid4().hex,
        "jtv": jtv,
        "exp": int(round(access_expire.timestamp())),
        "token_type": "access",
    }

    access_token = jwt.encode(payload, configs.SECRET_KEY, algorithm=ALGORITHM)
    return access_token


def create_refresh_token(
        user_id: int, jtv: int, 
        expires_delta: timedelta = None
) -> str:
    if expires_delta:
        refresh_expire = datetime.now(timezone.utc) + expires_delta
    else:
        refresh_expire = datetime.now(timezone.utc) + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)

    payload = {
        "user_id": user_id,
        "iat": int(round(datetime.now(timezone.utc).timestamp())),
        "jti": uuid.uuid4().hex,
        "jtv": jtv,
        "exp": int(round(refresh_expire.timestamp())),
        "token_type": "refresh",
    }
    refresh_token = jwt.encode(payload, configs.SECRET_KEY, algorithm=ALGORITHM)
    return refresh_token


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, configs.SECRET_KEY, algorithms=ALGORITHM)
        return decoded_token if decoded_token["exp"] >= int(round(datetime.now(timezone.utc).timestamp())) else None
    except Exception as e:
        return {}


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise AuthError(detail="Invalid authentication scheme.")
            # if not self.verify_jwt(credentials.credentials):
            #     raise AuthError(detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise AuthError(detail="Invalid authorization code.")
        

class OptionalJWTBearer(HTTPBearer):
    def __init__(self):
        super().__init__(auto_error=False)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            if credentials.scheme != "Bearer":
                raise AuthError(detail="Invalid authentication scheme.")
            return credentials.credentials
        return None  # No token provided, and that’s okay