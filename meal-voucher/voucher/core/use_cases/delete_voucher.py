from datetime import datetime, timedelta, timezone

from voucher.core.interfaces.voucher_repository import IVoucherRepository
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plan_time_policy.core.interfaces.time_policy_repository import IMealPlanTimePolicyRepository


class DeleteVoucher:
    def __init__(
        self,
        voucher_repo: IVoucherRepository,
        meal_plan_repo: IMealPlanRepository,
        time_policy_repo: IMealPlanTimePolicyRepository,
    ):
        self.voucher_repo = voucher_repo
        self.meal_plan_repo = meal_plan_repo
        self.time_policy_repo = time_policy_repo

    async def execute(self, voucher_id: int, user_public_id: str):
        voucher = await self.voucher_repo.get_by_id(voucher_id)
        if not voucher:
            raise ValueError("Voucher not found")

        if voucher.user_public_id != user_public_id:
            raise ValueError("Voucher does not belong to the user")

        meal_plan = await self.meal_plan_repo.get_by_id(voucher.meal_plan_id)
        if not meal_plan:
            raise ValueError("Meal plan not found")

        today_utc = datetime.now(timezone.utc).date()
        if meal_plan.plan_date < today_utc:
            raise ValueError("Meal plan date has passed")

        weekday_index = meal_plan.plan_date.weekday()
        policy = await self.time_policy_repo.get_by_day_index(weekday_index)

        if policy:
            cutoff_dt = datetime.combine(
                meal_plan.plan_date - timedelta(days=policy.offset_days),
                policy.cutoff_time,
                tzinfo=timezone.utc,
            )
            now_utc = datetime.now(timezone.utc)
            if now_utc > cutoff_dt:
                raise ValueError("Cutoff time passed")

        await self.voucher_repo.delete_one(voucher_id)
