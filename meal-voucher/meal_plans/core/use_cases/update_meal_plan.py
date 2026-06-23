from datetime import date
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plans.core.entities.meal_plan_entity import MealPlanEntity


class UpdateMealPlan:
    def __init__(self, repository: IMealPlanRepository):
        self.repository = repository

    async def execute(
        self,
        plan_id: int,
        new_meal_id: int,
        requester_role: int,
    ) -> MealPlanEntity:

        if requester_role < 10:
            raise PermissionError()

        old = await self.repository.get_by_id(plan_id)
        if not old:
            raise ValueError("MealPlan not found")

        today = date.today()
        if old.plan_date < today:
            raise ValueError("Cannot update past or today plans")

        updated = await self.repository.update_meal(plan_id, new_meal_id)
        return updated
