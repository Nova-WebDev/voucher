from sqlalchemy.ext.asyncio import AsyncSession

from app.redis.redis_client import redis_client

from auth.core.use_cases.validate_phone import ValidatePhone
from auth.core.use_cases.send_verification_code_phone import SendVerificationCodePhone
from auth.core.use_cases.verify_phone_verification_code import VerifyPhoneVerificationCode

from auth.infrastructure.data.repositories.auth_repository import AuthRepository

from auth.infrastructure.store.code_store import CodeStore
from auth.infrastructure.store.block_store import BlockStore
from auth.infrastructure.store.attempt_counter_store import AttemptCounterStore

from auth.infrastructure.sms.kavenegar_sms_sender import KavenegarSmsSender

from auth.utility.code_generator import CodeGenerator


def get_validate_phone_uc(session: AsyncSession) -> ValidatePhone:
    return ValidatePhone(
        auth_repository=AuthRepository(session)
    )

def get_send_code_phone_uc():
    return SendVerificationCodePhone(
        block_store=BlockStore(redis_client),
        code_generator=CodeGenerator(),
        code_store=CodeStore(redis_client),
        sms_sender=KavenegarSmsSender()
    )


def get_verify_phone_verification_code_uc():
    return VerifyPhoneVerificationCode(
        code_store=CodeStore(redis_client),
        block_store=BlockStore(redis_client),
        attempt_counter=AttemptCounterStore(redis_client),
    )
