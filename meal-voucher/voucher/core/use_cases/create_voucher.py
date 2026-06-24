from datetime import datetime, timedelta, timezone

from voucher.core.interfaces.voucher_repository import IVoucherRepository
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plan_time_policy.core.interfaces.time_policy_repository import IMealPlanTimePolicyRepository


class CreateVoucher:
    def __init__(
        self,
        voucher_repo: IVoucherRepository,
        meal_plan_repo: IMealPlanRepository,
        time_policy_repo: IMealPlanTimePolicyRepository,
    ):
        self.voucher_repo = voucher_repo
        self.meal_plan_repo = meal_plan_repo
        self.time_policy_repo = time_policy_repo

    async def execute(self, user_public_ids: list[str], meal_plan_id: int):
        meal_plan = await self.meal_plan_repo.get_by_id(meal_plan_id)
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

        return await self.voucher_repo.create_many(
            user_public_ids=user_public_ids,
            meal_plan_id=meal_plan_id,
        )
