from fastapi import FastAPI, Request
from fastapi_pagination import add_pagination
from loguru import logger

from app.api.v1.routers import api_router
from app.core.container import Container
from app.core.config import configs
from app.core.logging import setup_logging
import time
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware


app = FastAPI(
    title=configs.PROJECT_NAME,
    description="CV Builder API",
    version="1.0.0",
)


class EndpointLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.debug(f"Request: {request.method} {request.url.path}")
        response = await call_next(request)
        return response


class ExecutionTimeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        response = await call_next(request)
        process_time = time.perf_counter() - start_time

        if process_time > 1.0:
            logger.warning(
                f"Slow request: {request.method} {request.url.path} "
                f"completed in {process_time:.4f}s"
            )
        else:
            logger.debug(
                f"{request.method} {request.url.path} "
                f"completed in {process_time:.4f}s"
            )
        return response


class DelayMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        await asyncio.sleep(0.25)
        return response


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=configs.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(EndpointLoggingMiddleware)
app.add_middleware(ExecutionTimeMiddleware)
app.add_middleware(DelayMiddleware)

app.include_router(api_router, prefix="/api/v1")
add_pagination(app)

container = Container()
