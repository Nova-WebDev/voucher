from typing import List
from sqlalchemy import select, update, delete
from sqlalchemy.exc import IntegrityError
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

    async def insert(self, entity: MealPlanTimePolicyEntity) -> MealPlanTimePolicyEntity:
        model = MealPlanTimePolicy(
            day_index=entity.day_index,
            offset_days=entity.offset_days,
            cutoff_time=entity.cutoff_time
        )

        self.session.add(model)

        try:
            await self.session.commit()
        except IntegrityError:
            await self.session.rollback()
            raise ValueError("DAY_INDEX_ALREADY_EXISTS")

        await self.session.refresh(model)

        return MealPlanTimePolicyEntity(
            id=model.id,
            day_index=model.day_index,
            offset_days=model.offset_days,
            cutoff_time=model.cutoff_time
        )


    async def update_by_day_index(self, day_index: int, offset_days: int, cutoff_time):
        stmt = (
            update(MealPlanTimePolicy)
            .where(MealPlanTimePolicy.day_index == day_index)
            .values(offset_days=offset_days, cutoff_time=cutoff_time)
            .returning(
                MealPlanTimePolicy.id,
                MealPlanTimePolicy.day_index,
                MealPlanTimePolicy.offset_days,
                MealPlanTimePolicy.cutoff_time,
            )
            .execution_options(synchronize_session=False)
        )

        try:
            result = await self.session.execute(stmt)
            await self.session.commit()
        except IntegrityError:
            await self.session.rollback()
            raise ValueError("UPDATE_FAILED")

        row = result.fetchone()

        return row


    async def delete_by_id(self, policy_id: int):
        stmt = (
            delete(MealPlanTimePolicy)
            .where(MealPlanTimePolicy.id == policy_id)
            .returning(
                MealPlanTimePolicy.id,
                MealPlanTimePolicy.day_index,
                MealPlanTimePolicy.offset_days,
                MealPlanTimePolicy.cutoff_time,
            )
            .execution_options(synchronize_session=False)
        )

        try:
            result = await self.session.execute(stmt)
            await self.session.commit()
        except IntegrityError:
            await self.session.rollback()
            raise ValueError("DELETE_FAILED")

        row = result.fetchone()
        return row

    async def get_by_day_index(self, day_index: int) -> MealPlanTimePolicyEntity | None:
        stmt = select(MealPlanTimePolicy).where(MealPlanTimePolicy.day_index == day_index)
        row = (await self.session.execute(stmt)).scalar_one_or_none()

        if row is None:
            return None

        return MealPlanTimePolicyEntity(
            id=row.id,
            day_index=row.day_index,
            offset_days=row.offset_days,
            cutoff_time=row.cutoff_time,
        )