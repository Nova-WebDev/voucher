from app.settings import settings

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.error_mapper import map_error

from di.meal_plan_recurring_providers import get_insert_recurring_meal_plans_uc, get_apply_recurring_meal_plans_uc
from schemas.meal_plan_recurring.recurring_insert import RecurringInsertSchema
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
