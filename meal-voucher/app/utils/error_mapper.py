from fastapi import HTTPException, status
from app.utils.logger import logger

from auth.core.errors.auth_errors import (
    InvalidPhoneFormatError,
    UserNotFoundError,
    UserBlockedError,
    PhoneTemporarilyBlockedError,
)


def map_error(exc: Exception) -> HTTPException:

    if isinstance(exc, InvalidPhoneFormatError):
        logger.error(f"Invalid phone format: {exc}")
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number format",
        )

    if isinstance(exc, UserNotFoundError):
        logger.error(f"User not found: {exc}")
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if isinstance(exc, UserBlockedError):
        logger.error(f"User is blocked: {exc}")
        return HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is blocked",
        )

    if isinstance(exc, PhoneTemporarilyBlockedError):
        logger.error(f"Phone temporarily blocked: {exc}")
        return HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Phone temporarily blocked",
        )

    logger.error("Unhandled auth error", exc_info=True)
    return HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Internal server error",
    )
