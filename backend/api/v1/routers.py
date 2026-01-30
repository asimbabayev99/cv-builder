from fastapi import APIRouter
from .endpoints import user, home, cv

api_router = APIRouter()
api_router.include_router(home.router)
api_router.include_router(user.router)
api_router.include_router(cv.router, prefix="/resumes")