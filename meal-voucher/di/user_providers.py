from sqlalchemy.ext.asyncio import AsyncSession

from app.redis.redis_client import redis_client

from users.core.use_cases.update_user import UpdateUser
from users.core.use_cases.create_user import CreateUser
from users.core.use_cases.update_my_name import UpdateMyName
from users.core.use_cases.get_users_by_public_ids import GetUsersByPublicIds
from users.core.use_cases.get_users_paginated import GetUsersPaginated
from users.core.use_cases.block_user import BlockUser
from users.core.use_cases.validate_branch_users import ValidateBranchUsers
from users.core.use_cases.check_branch_id import CheckBranchId

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


def get_validate_branch_users_uc(session: AsyncSession) -> ValidateBranchUsers:
    user_repo = UserRepository(session)
    return ValidateBranchUsers(user_repo)

def get_check_branch_id_uc(session: AsyncSession) -> CheckBranchId:
    user_repo = UserRepository(session)
    return CheckBranchId(user_repo)