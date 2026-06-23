from sqlalchemy.ext.asyncio import AsyncSession

from meal_plans.core.use_cases.create_meal_plan import CreateMealPlan
from meal_plans.core.use_cases.get_week_meal_plans import GetWeekMealPlans
from meal_plans.infrastructure.data.meal_plan_repository import MealPlanRepository
from meal_plans.core.use_cases.update_meal_plan import UpdateMealPlan
from meal_plans.core.use_cases.delete_meal_plan import DeleteMealPlan


def get_create_meal_plan_uc(session: AsyncSession) -> CreateMealPlan:
    repo = MealPlanRepository(session)
    return CreateMealPlan(repository=repo)

def get_get_week_meal_plans_uc(session: AsyncSession) -> GetWeekMealPlans:
    repo = MealPlanRepository(session)
    return GetWeekMealPlans(repository=repo)

def get_update_meal_plan_uc(session: AsyncSession) -> UpdateMealPlan:
    repo = MealPlanRepository(session)
    return UpdateMealPlan(repository=repo)

def get_delete_meal_plan_uc(session: AsyncSession) -> DeleteMealPlan:
    repo = MealPlanRepository(session)
    return DeleteMealPlan(repository=repo)
