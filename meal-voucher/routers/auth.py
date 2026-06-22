from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.send_code_request import SendCodeRequest
from di.auth_providers import (
    get_validate_phone_uc,
    get_send_code_phone_uc
)
from app.data.db import get_session
from app.utils.error_mapper import map_error

from auth.core.entities.auth_session_entity import AuthSessionEntity


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/send-code")
async def send_code(
    payload: SendCodeRequest,
    session: AsyncSession = Depends(get_session),
):
    validate_phone_uc = get_validate_phone_uc(session)
    send_code_uc = get_send_code_phone_uc()

    try:
        user_entity = await validate_phone_uc.execute(payload.phone_number)

        session_entity = AuthSessionEntity(
            public_id=user_entity.public_id,
            phone_number=user_entity.phone_number,
            role=user_entity.role
        )

        await send_code_uc.execute(session_entity)

        return {
            "success": True,
            "user": {
                "public_id": session_entity.public_id,
                "phone_number": session_entity.phone_number,
                "role": session_entity.role,
            }
        }

    except Exception as e:
        raise map_error(e)