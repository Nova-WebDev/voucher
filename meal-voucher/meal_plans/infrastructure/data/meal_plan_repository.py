from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date

from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plans.core.entities.meal_plan_entity import MealPlanEntity
from meal_plans.infrastructure.data.models import MealPlan


class MealPlanRepository(IMealPlanRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, plan_date: date, meal_id: int) -> MealPlanEntity:
        plan = MealPlan(plan_date=plan_date, meal_id=meal_id)
        self.session.add(plan)
        await self.session.flush()
        return MealPlanEntity(id=plan.id, plan_date=plan.plan_date, meal_id=plan.meal_id)

    async def get_by_date_and_meal(self, plan_date: date, meal_id: int) -> MealPlanEntity | None:
        stmt = select(MealPlan).where(
            MealPlan.plan_date == plan_date,
            MealPlan.meal_id == meal_id,
        )
        result = await self.session.execute(stmt)
        plan = result.scalar_one_or_none()
        if not plan:
            return None
        return MealPlanEntity(id=plan.id, plan_date=plan.plan_date, meal_id=plan.meal_id)

    async def list_between(self, start_date: date, end_date: date) -> list[MealPlanEntity]:
        stmt = select(MealPlan).where(
            MealPlan.plan_date >= start_date,
            MealPlan.plan_date <= end_date,
        )
        result = await self.session.execute(stmt)
        rows = result.scalars().all()
        return [
            MealPlanEntity(id=row.id, plan_date=row.plan_date, meal_id=row.meal_id)
            for row in rows
        ]

    async def update_meal(self, plan_id: int, meal_id: int) -> MealPlanEntity:
        stmt = (
            update(MealPlan)
            .where(MealPlan.id == plan_id)
            .values(meal_id=meal_id)
            .returning(MealPlan)
        )
        result = await self.session.execute(stmt)
        row = result.scalar_one()
        return MealPlanEntity(id=row.id, plan_date=row.plan_date, meal_id=row.meal_id)

    async def get_by_id(self, plan_id: int) -> MealPlanEntity | None:
        stmt = select(MealPlan).where(MealPlan.id == plan_id)
        result = await self.session.execute(stmt)
        row = result.scalar_one_or_none()
        if not row:
            return None
        return MealPlanEntity(
            id=row.id,
            plan_date=row.plan_date,
            meal_id=row.meal_id,
        )

    async def delete(self, plan_id: int) -> None:
        stmt = delete(MealPlan).where(MealPlan.id == plan_id)
        await self.session.execute(stmt)
