
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.data.db import get_session
from app.security.dependencies import get_current_user

from di.branch_providers import (
    get_create_branch_uc,
    get_list_branches_uc,
    get_update_branch_uc,
    get_delete_branch_uc,
)

from schemas.branch.branch_create import CreateBranchRequest
from schemas.branch.branch_item import BranchItem
from schemas.branch.branch_list import BranchListResponse
from schemas.branch.branch_update import UpdateBranchRequest
from schemas.branch.branch_delete import DeleteBranchRequest

from app.utils.error_mapper import map_error


router = APIRouter(prefix="/branch", tags=["branch"])


@router.post("/create", response_model=BranchItem)
async def create_branch(
    payload: CreateBranchRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_branch_uc(session)
        branch = await uc.execute(role=_user.role, name=payload.name)
        return BranchItem(id=branch.id, name=branch.name)
    except Exception as e:
        raise map_error(e)

@router.get("/list", response_model=BranchListResponse)
async def list_branches(
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_list_branches_uc(session)
        branches = await uc.execute(role=_user.role)

        return BranchListResponse(
            items=[BranchItem(id=b.id, name=b.name) for b in branches]
        )
    except Exception as e:
        raise map_error(e)


@router.put("/update", response_model=BranchItem)
async def update_branch(
    payload: UpdateBranchRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:

        uc = get_update_branch_uc(session)
        branch = await uc.execute(role=_user.role, branch_id=payload.id, new_name=payload.name)

        return BranchItem(id=branch.id, name=branch.name)

    except Exception as e:
        raise map_error(e)

@router.delete("/delete")
async def delete_branch(
    payload: DeleteBranchRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_delete_branch_uc(session)
        await uc.execute(role=_user.role, branch_id=payload.id)

        return {"success": True}

    except Exception as e:
        raise map_error(e)
