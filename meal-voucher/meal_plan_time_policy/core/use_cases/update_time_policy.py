from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity

class UpdateMealPlanTimePolicy:
    def __init__(self, repository):
        self.repository = repository

    async def execute(self, role: int, day_index: int, offset_days: int, cutoff_time):
        if role != 20:
            raise PermissionError("ROLE_NOT_ALLOWED")

        row = await self.repository.update_by_day_index(
            day_index=day_index,
            offset_days=offset_days,
            cutoff_time=cutoff_time
        )

        if row is None:
            raise ValueError("NOT_FOUND")

        return MealPlanTimePolicyEntity(
            id=row.id,
            day_index=row.day_index,
            offset_days=row.offset_days,
            cutoff_time=row.cutoff_time
        )
