from fastapi import APIRouter
from .endpoints import user, home

api_router = APIRouter()
api_router.include_router(home.router)
api_router.include_router(user.router)