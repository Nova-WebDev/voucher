from datetime import date
from typing import Iterable

from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from meal_plan_recurring.infrastructure.data.models import MealPlanRecurring
from meal_plan_recurring.core.entities.meal_plan_recurring_entity import MealPlanRecurringEntity
from meal_plan_recurring.core.interfaces.meal_plan_recurring_repository import IMealPlanRecurringRepository


class MealPlanRecurringRepository(IMealPlanRecurringRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def clear_all(self) -> None:
        stmt = delete(MealPlanRecurring)
        await self.session.execute(stmt)
        await self.session.commit()

    async def insert_many(self, rows: Iterable[MealPlanRecurringEntity]) -> None:
        values = [
            {
                "meal_id": row.meal_id,
                "target_date": row.target_date,
                "order_index": row.order_index,
            }
            for row in rows
        ]
        stmt = insert(MealPlanRecurring)
        await self.session.execute(stmt, values)
        await self.session.commit()

    async def list_between(self, start_date: date, end_date: date) -> list[MealPlanRecurringEntity]:
        stmt = select(MealPlanRecurring).where(
            MealPlanRecurring.target_date >= start_date,
            MealPlanRecurring.target_date <= end_date,
        )
        result = await self.session.execute(stmt)
        rows = result.scalars().all()

        return [
            MealPlanRecurringEntity(
                id=r.id,
                meal_id=r.meal_id,
                target_date=r.target_date,
                order_index=r.order_index,
            )
            for r in rows
        ]

    async def get_last(self) -> MealPlanRecurringEntity | None:
        stmt = (
            select(MealPlanRecurring)
            .order_by(MealPlanRecurring.target_date.desc())
            .limit(1)
        )
        result = await self.session.execute(stmt)
        row = result.scalar_one_or_none()

        if not row:
            return None

        return MealPlanRecurringEntity(
            id=row.id,
            meal_id=row.meal_id,
            target_date=row.target_date,
            order_index=row.order_index,
        )

    async def update_target_date(self, row_id: int, new_date: date) -> None:
        stmt = (
            update(MealPlanRecurring)
            .where(MealPlanRecurring.id == row_id)
            .values(target_date=new_date)
        )
        await self.session.execute(stmt)
        await self.session.commit()

    async def get_all(self) -> list[MealPlanRecurringEntity]:
        stmt = select(MealPlanRecurring).order_by(MealPlanRecurring.target_date.asc())
        result = await self.session.execute(stmt)
        rows = result.scalars().all()
        return [
            MealPlanRecurringEntity(
                id=r.id,
                meal_id=r.meal_id,
                target_date=r.target_date,
                order_index=r.order_index,
            )
            for r in rows
        ]
