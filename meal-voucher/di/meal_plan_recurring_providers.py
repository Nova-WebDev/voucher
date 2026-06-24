from sqlalchemy.ext.asyncio import AsyncSession

from meal_plans.infrastructure.data.meal_plan_repository import MealPlanRepository
from meal_plan_recurring.infrastructure.data.meal_plan_recurring_repository import (
    MealPlanRecurringRepository,
)
from meal_plan_recurring.core.use_cases.insert_recurring_meal_plans import InsertRecurringMealPlans
from meal_plan_recurring.core.use_cases.apply_recurring_meal_plans import ApplyRecurringMealPlans



def get_insert_recurring_meal_plans_uc(session: AsyncSession) -> InsertRecurringMealPlans:
    meal_plan_repo = MealPlanRepository(session)
    recurring_repo = MealPlanRecurringRepository(session)
    return InsertRecurringMealPlans(
        meal_plan_repo=meal_plan_repo,
        recurring_repo=recurring_repo,
    )

def get_apply_recurring_meal_plans_uc(session: AsyncSession) -> ApplyRecurringMealPlans:
    meal_plan_repo = MealPlanRepository(session)
    recurring_repo = MealPlanRecurringRepository(session)
    return ApplyRecurringMealPlans(
        meal_plan_repo=meal_plan_repo,
        recurring_repo=recurring_repo,
    )
