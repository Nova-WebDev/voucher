from typing import List
from sqlalchemy import insert, select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from voucher.core.entities.voucher_entity import VoucherEntity
from voucher.core.interfaces.voucher_repository import IVoucherRepository
from voucher.infrastructure.data.models import Voucher
from meal_plans.infrastructure.data.models import MealPlan
from meals.infrastructure.data.models import Meal

from users.infrastructure.data.models import User

class VoucherRepository(IVoucherRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_many(self, user_public_ids: List[str], meal_plan_id: int) -> List[VoucherEntity]:
        values = [
            {"user_public_id": uid, "meal_plan_id": meal_plan_id}
            for uid in user_public_ids
        ]

        stmt = (
            insert(Voucher)
            .values(values)
            .returning(
                Voucher.id,
                Voucher.user_public_id,
                Voucher.meal_plan_id,
                Voucher.created_at,
            )
        )

        result = await self.session.execute(stmt)
        rows = result.fetchall()

        return [
            VoucherEntity(
                id=row.id,
                user_public_id=row.user_public_id,
                meal_plan_id=row.meal_plan_id,
                created_at=row.created_at,
            )
            for row in rows
        ]

    async def get_by_id(self, voucher_id: int) -> VoucherEntity | None:
        stmt = select(Voucher).where(Voucher.id == voucher_id)
        row = (await self.session.execute(stmt)).scalar_one_or_none()
        if not row:
            return None
        return VoucherEntity(
            id=row.id,
            user_public_id=row.user_public_id,
            meal_plan_id=row.meal_plan_id,
            created_at=row.created_at,
        )

    async def delete_one(self, voucher_id: int) -> None:
        stmt = delete(Voucher).where(Voucher.id == voucher_id)
        await self.session.execute(stmt)

    async def get_by_user_and_meal_plan(self, user_public_id: str, meal_plan_id: int) -> VoucherEntity | None:
        stmt = select(Voucher).where(
            Voucher.user_public_id == user_public_id,
            Voucher.meal_plan_id == meal_plan_id,
        )
        row = (await self.session.execute(stmt)).scalar_one_or_none()
        if not row:
            return None
        return VoucherEntity(
            id=row.id,
            user_public_id=row.user_public_id,
            meal_plan_id=row.meal_plan_id,
            created_at=row.created_at,
        )

    async def get_branch_vouchers(self, branch_id: str, meal_plan_id: int) -> List[VoucherEntity]:
        stmt = (
            select(Voucher)
            .join(User, User.public_id == Voucher.user_public_id)
            .where(
                User.branch_id == branch_id,
                Voucher.meal_plan_id == meal_plan_id,
            )
        )

        rows = (await self.session.execute(stmt)).scalars().all()

        return [
            VoucherEntity(
                id=r.id,
                user_public_id=r.user_public_id,
                meal_plan_id=r.meal_plan_id,
                created_at=r.created_at,
            )
            for r in rows
        ]

    async def get_vouchers_with_branch(self, meal_plan_id: int) -> List[dict]:
        stmt = (
            select(
                User.public_id,
                User.branch_id,
                Voucher.meal_plan_id,
            )
            .join(User, User.public_id == Voucher.user_public_id)
            .where(Voucher.meal_plan_id == meal_plan_id)
        )

        rows = (await self.session.execute(stmt)).all()

        return [
            {
                "public_id": r.public_id,
                "branch_id": r.branch_id,
                "meal_plan_id": r.meal_plan_id,
            }
            for r in rows
        ]


    async def get_voucher_report_rows(self, meal_plan_id: int, branch_id: str | None):
        stmt = (
            select(
                Meal.title,
                Meal.description,
                MealPlan.plan_date,
                User.username,
            )
            .join(User, User.public_id == Voucher.user_public_id)
            .join(MealPlan, MealPlan.id == Voucher.meal_plan_id)
            .join(Meal, Meal.id == MealPlan.meal_id)
            .where(
                Voucher.meal_plan_id == meal_plan_id,
                User.branch_id == branch_id,
            )
        )

        rows = (await self.session.execute(stmt)).all()
        return rows