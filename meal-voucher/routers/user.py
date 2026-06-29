from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from users.core.entities.enums import UserOrderBy

from app.data.db import get_session
from app.security.dependencies import get_current_user
from app.utils.error_mapper import map_error

from di.user_providers import (
    get_create_user_uc,
    get_update_user_uc,
    get_update_my_name_uc,
    get_users_paginated_uc,
    get_users_by_public_ids_uc,
    get_block_user_uc,
)

from schemas.user.user_create import CreateUserRequest
from schemas.user.user_update import UpdateUserRequest
from schemas.user.user_update_my_name import UpdateMyNameRequest
from schemas.user.user_paginated import UsersPaginatedResponse
from schemas.user.user_public_ids import UsersByPublicIdsRequest
from schemas.user.user_block import BlockUserRequest
from schemas.user.user_item import UserItem


router = APIRouter(prefix="/user", tags=["user"])


@router.post("/create", response_model=UserItem)
async def create_user(
    payload: CreateUserRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_user_uc(session)
        user = await uc.execute(
            requester_role=_user["role"],
            phone=payload.phone,
            username=payload.username,
            branch_id=payload.branch_id,
            branch_role=payload.branch_role,
        )

        return UserItem(
            public_id=user.public_id,
            phone=user.phone,
            username=user.username,
            role=user.role,
            branch_id=user.branch_id,
            branch_role=user.branch_role,
            is_blocked=user.is_blocked,
        )
    except Exception as e:
        raise map_error(e)


@router.put("/update", response_model=UserItem)
async def update_user(
    payload: UpdateUserRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_update_user_uc(session)
        user = await uc.execute(
            requester_role=_user["role"],
            public_id=payload.public_id,
            phone=payload.phone,
            username=payload.username,
            branch_id=payload.branch_id,
            branch_role=payload.branch_role,
        )

        return UserItem(
            public_id=user.public_id,
            phone=user.phone,
            username=user.username,
            role=user.role,
            branch_id=user.branch_id,
            branch_role=user.branch_role,
            is_blocked=user.is_blocked,
        )
    except Exception as e:
        raise map_error(e)


@router.put("/update-my-name")
async def update_my_name(
    payload: UpdateMyNameRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_update_my_name_uc(session)
        new_name = await uc.execute(
            public_id=_user["public_id"],
            new_name=payload.new_name,
        )
        return {"new_name": new_name}
    except Exception as e:
        raise map_error(e)


@router.get("/paginated", response_model=UsersPaginatedResponse)
async def get_users_paginated(
    page: int,
    limit: int,
    search: str | None = None,
    order_by: str = "created_at",
    deorder: bool = False,
    include_self: bool = True,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        try:
            order_enum = UserOrderBy(order_by)
        except ValueError:
            order_enum = UserOrderBy.CREATED_AT

        uc = get_users_paginated_uc(session)
        result = await uc.execute(
            requester_role=_user["role"],
            page=page,
            limit=limit,
            search=search,
            current_user_public_id=_user["public_id"],
            order_by=order_enum,
            deorder=deorder,
            include_self=include_self,
        )

        return UsersPaginatedResponse(
            users=[
                UserItem(
                    public_id=u.public_id,
                    phone=u.phone,
                    username=u.username,
                    role=u.role,
                    branch_id=u.branch_id,
                    branch_role=u.branch_role,
                    is_blocked=u.is_blocked,
                )
                for u in result["users"]
            ],
            total_count=result["total_count"],
        )
    except Exception as e:
        raise map_error(e)


@router.post("/by-public-ids", response_model=list[UserItem])
async def get_users_by_public_ids(
    payload: UsersByPublicIdsRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_users_by_public_ids_uc(session)
        users = await uc.execute(payload.public_ids)

        return [
            UserItem(
                public_id=u.public_id,
                phone=u.phone,
                username=u.username,
                role=u.role,
                branch_id=u.branch_id,
                branch_role=u.branch_role,
                is_blocked=u.is_blocked,
            )
            for u in users
        ]
    except Exception as e:
        raise map_error(e)



@router.get("/me", response_model=UserItem)
async def get_my_profile(
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_users_by_public_ids_uc(session)
        users = await uc.execute([_user["public_id"]])
        u = users[0]
        return UserItem(
                public_id=u.public_id,
                phone=u.phone,
                username=u.username,
                role=u.role,
                branch_id=u.branch_id,
                branch_role=u.branch_role,
                is_blocked=u.is_blocked,
            )
    except Exception as e:
        raise map_error(e)



@router.put("/block")
async def block_user(
    payload: BlockUserRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:

        uc = get_block_user_uc(session)
        await uc.execute(
            requester_role=_user["role"],
            target_public_id=payload.public_id,
            block=payload.block,
        )

        return {"success": True}
    except Exception as e:
        raise map_error(e)
