from app.settings import settings

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.error_mapper import map_error

from di.meal_plan_recurring_providers import get_insert_recurring_meal_plans_uc, get_apply_recurring_meal_plans_uc, get_get_all_meal_plan_recurring_uc
from schemas.meal_plan_recurring.recurring_insert import RecurringInsertSchema
from schemas.meal_plan_recurring.meal_plane_recurring_read import MealPlanRecurringRead
from app.security.dependencies import get_current_user
from app.data.db import get_session


router = APIRouter(prefix="/meal-plan-recurring", tags=["MealPlanRecurring"])


@router.post("/insert")
async def insert_recurring_meal_plans(
    body: RecurringInsertSchema,
    session: AsyncSession = Depends(get_session),
    _user=Depends(get_current_user),
):
    try:
        uc = get_insert_recurring_meal_plans_uc(session)

        await uc.execute(
            mapping=body.mapping,
            requester_role=_user["role"],
        )

        return {"status": "ok"}
    except Exception as e:
        raise map_error(e)

@router.get("/get-all", response_model=list[MealPlanRecurringRead])
async def get_all(
        session: AsyncSession = Depends(get_session),
        _user=Depends(get_current_user),
):
    try:
        uc = get_get_all_meal_plan_recurring_uc(session)
        rows = await uc.execute(role=_user["role"])

        return [
            MealPlanRecurringRead(
                id=r.id,
                meal_id=r.meal_id,
                target_date=r.target_date,
                order_index=r.order_index,
            )
            for r in rows
        ]
    except Exception as e:
        raise map_error(e)


@router.post("/apply")
async def apply_recurring_meal_plans(
    api_key: str,
    session: AsyncSession = Depends(get_session),
):
    try:

        if api_key != settings.cron_api_key:
            raise HTTPException(status_code=403, detail="Forbidden")

        uc = get_apply_recurring_meal_plans_uc(session)
        await uc.execute()

        return {"status": "ok"}
    except Exception as e:
        raise map_error(e)
