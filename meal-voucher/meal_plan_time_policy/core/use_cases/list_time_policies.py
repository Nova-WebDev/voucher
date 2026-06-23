from typing import List
from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity
from meal_plan_time_policy.core.interfaces.time_policy_repository import IMealPlanTimePolicyRepository


class ListMealPlanTimePolicies:
    def __init__(self, repository: IMealPlanTimePolicyRepository):
        self.repository = repository

    async def execute(self) -> List[MealPlanTimePolicyEntity]:
        return await self.repository.list_all()
