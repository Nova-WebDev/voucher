from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity

class DeleteMealPlanTimePolicy:
    def __init__(self, repository):
        self.repository = repository

    async def execute(self, role: int, policy_id: int):
        if role != 20:
            raise PermissionError("ROLE_NOT_ALLOWED")

        row = await self.repository.delete_by_id(policy_id)

        if row is None:
            raise ValueError("NOT_FOUND")

        return MealPlanTimePolicyEntity(
            id=row.id,
            day_index=row.day_index,
            offset_days=row.offset_days,
            cutoff_time=row.cutoff_time,
        )
