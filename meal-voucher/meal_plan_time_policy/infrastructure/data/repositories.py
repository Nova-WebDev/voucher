from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity
from meal_plan_time_policy.core.interfaces.time_policy_repository import IMealPlanTimePolicyRepository
from meal_plan_time_policy.infrastructure.data.models import MealPlanTimePolicy


class MealPlanTimePolicyRepository(IMealPlanTimePolicyRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_all(self) -> List[MealPlanTimePolicyEntity]:
        stmt = select(MealPlanTimePolicy)
        rows = (await self.session.execute(stmt)).scalars().all()

        return [
            MealPlanTimePolicyEntity(
                id=row.id,
                day_index=row.day_index,
                offset_days=row.offset_days,
                cutoff_time=row.cutoff_time
            )
            for row in rows
        ]
