"""
Logging configuration for the FastAPI application.

This module provides a centralized logging setup using loguru,
with support for structured logging, request tracing, and
environment-specific configurations.
"""

import sys
from loguru import logger
from app.core.config import configs


def setup_logging():
    """
    Configure application-wide logging using loguru.

    Sets up different logging levels and formats based on the environment:
    - Development: DEBUG level with colored output
    - Production: INFO level with JSON format for log aggregation

    Returns:
        logger: Configured loguru logger instance
    """
    # Remove default handler
    logger.remove()

    # Define log format based on environment
    if configs.ENV == "prod":
        # Production: JSON format for log aggregation (ELK, CloudWatch, etc.)
        log_format = (
            "{time:YYYY-MM-DD HH:mm:ss.SSS} | "
            "{level: <8} | "
            "{name}:{function}:{line} | "
            "{message}"
        )
        log_level = "INFO"
    else:
        # Development: Human-readable format with colors
        log_format = (
            "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
            "<level>{level: <8}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
            "<level>{message}</level>"
        )
        log_level = "DEBUG"

    # Add stdout handler
    logger.add(
        sys.stdout,
        format=log_format,
        level=log_level,
        colorize=configs.ENV != "prod",
        backtrace=configs.ENV != "prod",
        diagnose=configs.ENV != "prod",
    )

    # Add file handler for production
    if configs.ENV == "prod":
        logger.add(
            "logs/app.log",
            format=log_format,
            level="INFO",
            rotation="100 MB",
            retention="30 days",
            compression="gz",
        )

    return logger


# Initialize logger on module import
setup_logging()
