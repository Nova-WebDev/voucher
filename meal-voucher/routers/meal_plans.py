from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date

from di.meal_plan_providers import get_create_meal_plan_uc, get_get_week_meal_plans_uc, get_update_meal_plan_uc, get_delete_meal_plan_uc
from app.data.db import get_session
from app.security.dependencies import get_current_user
from schemas.meal_plans.meal_plan_item import MealPlanItem
from schemas.meal_plans.meal_plan_week_item import WeekMealPlans, MealItemOut
from app.utils.error_mapper import map_error


router = APIRouter(prefix="/meal_plans", tags=["meal_plans"])


@router.post("/create", response_model=MealPlanItem)
async def create_meal_plan(
    plan_date: date,
    meal_id: int,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_meal_plan_uc(session)
        plan = await uc.execute(
            plan_date=plan_date,
            meal_id=meal_id,
            requester_role=_user.role,
        )
        return MealPlanItem(
            id=plan.id,
            plan_date=plan.plan_date,
            meal_id=plan.meal_id,
        )
    except Exception as e:
        raise map_error(e)

@router.get("/week", response_model=WeekMealPlans)
async def get_week_meal_plans(
    plan_date: date,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_get_week_meal_plans_uc(session)
        data = await uc.execute(plan_date=plan_date)

        typed = {
            d: [MealItemOut(**v) for v in values]
            for d, values in data.items()
        }

        return WeekMealPlans(root=typed)

    except Exception as e:
        raise map_error(e)


@router.put("/update/{plan_id}", response_model=MealPlanItem)
async def update_meal_plan(
    plan_id: int,
    meal_id: int,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_update_meal_plan_uc(session)
        plan = await uc.execute(
            plan_id=plan_id,
            new_meal_id=meal_id,
            requester_role=_user.role,
        )
        return MealPlanItem(
            id=plan.id,
            plan_date=plan.plan_date,
            meal_id=plan.meal_id,
        )
    except Exception as e:
        raise map_error(e)

@router.delete("/delete/{plan_id}")
async def delete_meal_plan(
    plan_id: int,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_delete_meal_plan_uc(session)
        await uc.execute(
            plan_id=plan_id,
            requester_role=_user.role,
        )
        return {"status": "ok"}
    except Exception as e:
        raise map_error(e)
