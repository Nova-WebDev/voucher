from fastapi import APIRouter, Depends
from typing import List

from di.meal_plan_time_policy_providers import get_list_time_policies_uc
from meal_plan_time_policy.core.use_cases.list_time_policies import ListMealPlanTimePolicies
from schemas.meal_plan_time_policy.time_policy_item import MealPlanTimePolicyItem

router = APIRouter(prefix="/meal-plan-time-policy", tags=["meal_plan_time_policy"])


@router.get("/list", response_model=List[MealPlanTimePolicyItem])
async def list_time_policies(
    uc: ListMealPlanTimePolicies = Depends(get_list_time_policies_uc),
):
    items = await uc.execute()
    return [
        MealPlanTimePolicyItem(
            id=i.id,
            day_index=i.day_index,
            offset_days=i.offset_days,
            cutoff_time=i.cutoff_time
        )
        for i in items
    ]
