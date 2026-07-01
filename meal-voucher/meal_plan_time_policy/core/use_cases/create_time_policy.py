from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity
from meal_plan_time_policy.core.interfaces.time_policy_repository import IMealPlanTimePolicyRepository


class CreateMealPlanTimePolicy:
    def __init__(self, repository: IMealPlanTimePolicyRepository):
        self.repository = repository

    async def execute(self, role: int, day_index: int, offset_days: int, cutoff_time):
        if role != 20:
            raise PermissionError("ROLE_NOT_ALLOWED")

        entity = MealPlanTimePolicyEntity(
            id=None,
            day_index=day_index,
            offset_days=offset_days,
            cutoff_time=cutoff_time
        )

        return await self.repository.insert(entity)
