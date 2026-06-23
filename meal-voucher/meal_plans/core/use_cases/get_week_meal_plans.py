from datetime import date, timedelta
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository


class GetWeekMealPlans:
    def __init__(self, repository: IMealPlanRepository):
        self.repository = repository

    async def execute(self, plan_date: date) -> dict[str, list[dict]]:
        weekday = plan_date.weekday()
        offset = (weekday - 5) % 7

        start_date = plan_date - timedelta(days=offset)

        plans = await self.repository.list_between(
            start_date,
            start_date + timedelta(days=6)
        )

        result: dict[str, list[dict]] = {
            (start_date + timedelta(days=i)).isoformat(): []
            for i in range(7)
        }

        for p in plans:
            key = p.plan_date.isoformat()
            result[key].append({
                "id": p.id,
                "meal_id": p.meal_id
            })

        return result