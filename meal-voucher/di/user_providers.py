from sqlalchemy.ext.asyncio import AsyncSession

from app.redis.redis_client import redis_client

from users.core.use_cases.update_user import UpdateUser
from users.core.use_cases.create_user import CreateUser
from users.core.use_cases.update_my_name import UpdateMyName
from users.core.use_cases.get_users_by_public_ids import GetUsersByPublicIds
from users.core.use_cases.get_users_paginated import GetUsersPaginated
from users.core.use_cases.block_user import BlockUser

from users.infrastructure.data.user_repository import UserRepository

from auth.infrastructure.store.auth_store import AuthStore


def get_create_user_uc(session: AsyncSession) -> CreateUser:
    return CreateUser(
        repository=UserRepository(session)
    )

def get_update_user_uc(session: AsyncSession) -> UpdateUser:
    return UpdateUser(
        repository=UserRepository(session)
    )

def get_update_my_name_uc(session: AsyncSession) -> UpdateMyName:
    return UpdateMyName(
        repository=UserRepository(session)
    )

def get_users_paginated_uc(session: AsyncSession) -> GetUsersPaginated:
    return GetUsersPaginated(
        repository=UserRepository(session)
    )

def get_users_by_public_ids_uc(session: AsyncSession) -> GetUsersByPublicIds:
    return GetUsersByPublicIds(
        repository=UserRepository(session)
    )

def get_block_user_uc(session: AsyncSession) -> BlockUser:
    return BlockUser(
        repository=UserRepository(session),
        auth_store=AuthStore(redis_client),
    )
