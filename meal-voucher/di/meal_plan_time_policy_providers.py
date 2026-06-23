from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.data.db import get_session
from meal_plan_time_policy.core.use_cases.list_time_policies import ListMealPlanTimePolicies
from meal_plan_time_policy.infrastructure.data.repositories import MealPlanTimePolicyRepository


def get_time_policy_repository(
    session: AsyncSession = Depends(get_session),
):
    return MealPlanTimePolicyRepository(session)


def get_list_time_policies_uc(
    repo=Depends(get_time_policy_repository),
):
    return ListMealPlanTimePolicies(repo)
