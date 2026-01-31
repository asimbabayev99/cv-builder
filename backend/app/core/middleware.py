"""
Custom middleware and decorators for dependency injection.

Provides an enhanced inject decorator that handles async functions
and ensures proper cleanup of scoped database sessions.
"""

import asyncio
from functools import wraps

from dependency_injector.wiring import inject as di_inject
from loguru import logger

from app.services.base_service import BaseService


def inject(func):
    """
    Enhanced dependency injection decorator.

    Wraps functions with dependency-injector's inject and handles:
    - Both sync and async functions
    - Automatic cleanup of scoped database sessions
    - Error logging for debugging

    Args:
        func: The function to wrap with injection

    Returns:
        Wrapped async function with DI and session cleanup
    """
    @di_inject
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        try:
            if asyncio.iscoroutinefunction(func):
                result = await func(*args, **kwargs)
            else:
                result = func(*args, **kwargs)

            # Find injected services and close their scoped sessions
            injected_services = [
                arg for arg in kwargs.values()
                if isinstance(arg, BaseService)
            ]

            if injected_services:
                try:
                    await injected_services[-1].close_scoped_session()
                except Exception as e:
                    logger.error(f"Error closing session: {e}")

            return result
        except Exception as e:
            logger.error(f"Error in injected function: {e}")
            raise

    return async_wrapper