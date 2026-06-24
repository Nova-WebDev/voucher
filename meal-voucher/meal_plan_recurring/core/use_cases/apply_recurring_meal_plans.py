from datetime import date, timedelta
from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plan_recurring.core.interfaces.meal_plan_recurring_repository import IMealPlanRecurringRepository


class ApplyRecurringMealPlans:
    def __init__(
        self,
        meal_plan_repo: IMealPlanRepository,
        recurring_repo: IMealPlanRecurringRepository,
    ):
        self.meal_plan_repo = meal_plan_repo
        self.recurring_repo = recurring_repo

    async def execute(self) -> None:

        today = date.today()
        start_date = today
        end_date = today + timedelta(days=13)

        rows = await self.recurring_repo.list_between(start_date, end_date)
        rows.sort(key=lambda r: r.target_date)

        for row in rows:
            if row.meal_id is None:
                continue

            existing = await self.meal_plan_repo.get_by_date_and_meal(
                plan_date=row.target_date,
                meal_id=row.meal_id,
            )

            if existing:
                continue

            await self.meal_plan_repo.create(
                plan_date=row.target_date,
                meal_id=row.meal_id,
            )

        last_row = await self.recurring_repo.get_last()
        if not last_row:
            return

        rows.sort(key=lambda r: r.order_index)

        current_date = last_row.target_date

        for row in rows:
            current_date = current_date + timedelta(days=1)
            await self.recurring_repo.update_target_date(
                row_id=row.id,
                new_date=current_date,
            )
