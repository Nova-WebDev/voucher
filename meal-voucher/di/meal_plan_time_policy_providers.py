from sqlalchemy.ext.asyncio import AsyncSession

from meal_plan_time_policy.infrastructure.data.repositories import MealPlanTimePolicyRepository
from meal_plan_time_policy.core.use_cases.list_time_policies import ListMealPlanTimePolicies
from meal_plan_time_policy.core.use_cases.create_time_policy import CreateMealPlanTimePolicy
from meal_plan_time_policy.core.use_cases.update_time_policy import UpdateMealPlanTimePolicy
from meal_plan_time_policy.core.use_cases.delete_time_policy import DeleteMealPlanTimePolicy


def get_list_time_policies_uc(session: AsyncSession) -> ListMealPlanTimePolicies:
    repo = MealPlanTimePolicyRepository(session)
    return ListMealPlanTimePolicies(repository=repo)


def get_create_time_policy_uc(session: AsyncSession) -> CreateMealPlanTimePolicy:
    repo = MealPlanTimePolicyRepository(session)
    return CreateMealPlanTimePolicy(repository=repo)


def get_update_time_policy_uc(session: AsyncSession) -> UpdateMealPlanTimePolicy:
    repo = MealPlanTimePolicyRepository(session)
    return UpdateMealPlanTimePolicy(repository=repo)

def get_delete_time_policy_uc(session):
    repo = MealPlanTimePolicyRepository(session)
    return DeleteMealPlanTimePolicy(repository=repo)
