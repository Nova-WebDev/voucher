from datetime import date
from meal_plans.core.entities.meal_plan_entity import MealPlanEntity
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository


class CreateMealPlan:
    def __init__(self, repository: IMealPlanRepository):
        self.repository = repository

    async def execute(
        self,
        plan_date: date,
        meal_id: int,
        requester_role: int,
    ) -> MealPlanEntity:

        if requester_role < 10:
            raise PermissionError()

        today = date.today()
        if plan_date <= today:
            raise ValueError("Cannot Create past or today plans")

        exists = await self.repository.get_by_date_and_meal(plan_date, meal_id)
        if exists:
            raise ValueError("MealPlan already exists for this date and meal")

        plan = await self.repository.create(plan_date=plan_date, meal_id=meal_id)
        return plan
