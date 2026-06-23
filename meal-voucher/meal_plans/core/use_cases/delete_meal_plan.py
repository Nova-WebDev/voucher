from datetime import date
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository


class DeleteMealPlan:
    def __init__(self, repository: IMealPlanRepository):
        self.repository = repository

    async def execute(
        self,
        plan_id: int,
        requester_role: int,
    ) -> None:

        if requester_role < 10:
            raise PermissionError()

        old = await self.repository.get_by_id(plan_id)
        if not old:
            raise ValueError("MealPlan not found")

        today = date.today()
        if old.plan_date <= today:
            raise ValueError("Cannot delete past or today plans")

        await self.repository.delete(plan_id)
