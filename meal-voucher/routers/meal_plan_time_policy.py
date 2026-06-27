from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.data.db import get_session
from app.security.dependencies import get_current_user
from app.utils.error_mapper import map_error

from di.meal_plan_time_policy_providers import (
    get_list_time_policies_uc,
    get_create_time_policy_uc,
    get_update_time_policy_uc,
    get_delete_time_policy_uc,
)

from schemas.meal_plan_time_policy.time_policy_item import MealPlanTimePolicyItem
from schemas.meal_plan_time_policy.time_policy_create import MealPlanTimePolicyCreate
from schemas.meal_plan_time_policy.time_policy_update import MealPlanTimePolicyUpdate


router = APIRouter(prefix="/meal-plan-time-policy", tags=["meal_plan_time_policy"])


@router.get("/list", response_model=List[MealPlanTimePolicyItem])
async def list_time_policies(
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_list_time_policies_uc(session)
        items = await uc.execute()

        return [
            MealPlanTimePolicyItem(
                id=i.id,
                day_index=i.day_index,
                offset_days=i.offset_days,
                cutoff_time=i.cutoff_time,
            )
            for i in items
        ]

    except Exception as e:
        raise map_error(e)


@router.post("/create", response_model=MealPlanTimePolicyItem)
async def create_time_policy(
    data: MealPlanTimePolicyCreate,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_time_policy_uc(session)

        result = await uc.execute(
            role=_user["role"],
            day_index=data.day_index,
            offset_days=data.offset_days,
            cutoff_time=data.cutoff_time,
        )

        return MealPlanTimePolicyItem(
            id=result.id,
            day_index=result.day_index,
            offset_days=result.offset_days,
            cutoff_time=result.cutoff_time,
        )

    except Exception as e:
        raise map_error(e)

@router.put("/update", response_model=MealPlanTimePolicyItem)
async def update_time_policy(
    data: MealPlanTimePolicyUpdate,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_update_time_policy_uc(session)

        result = await uc.execute(
            role=_user["role"],
            day_index=data.day_index,
            offset_days=data.offset_days,
            cutoff_time=data.cutoff_time,
        )

        return MealPlanTimePolicyItem(
            id=result.id,
            day_index=result.day_index,
            offset_days=result.offset_days,
            cutoff_time=result.cutoff_time,
        )

    except Exception as e:
        raise map_error(e)

@router.delete("/delete/{policy_id}")
async def delete_time_policy(
    policy_id: int,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_delete_time_policy_uc(session)

        await uc.execute(
            role=_user["role"],
            policy_id=policy_id,
        )

        return {"status": "ok"}

    except Exception as e:
        raise map_error(e)
