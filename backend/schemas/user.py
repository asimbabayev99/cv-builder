from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


class UserOut(BaseModel):
    id: int
    uid: UUID
    email: str
    first_name: str
    last_name: str
    image: Optional[str] = None
    role: str
    auth_provider: str

    model_config = ConfigDict(from_attributes=True)


class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = Field(None, min_length=1, max_length=50)
    last_name: Optional[str] = Field(None, min_length=1, max_length=50)
    image: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8)
