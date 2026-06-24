from datetime import date, timedelta
from collections import defaultdict

from meal_plans.core.interfaces.meal_plan_repository import IMealPlanRepository
from meal_plan_recurring.core.interfaces.meal_plan_recurring_repository import IMealPlanRecurringRepository
from meal_plan_recurring.core.entities.meal_plan_recurring_entity import MealPlanRecurringEntity


class InsertRecurringMealPlans:
    def __init__(
        self,
        meal_plan_repo: IMealPlanRepository,
        recurring_repo: IMealPlanRecurringRepository,
    ):
        self.meal_plan_repo = meal_plan_repo
        self.recurring_repo = recurring_repo

    async def execute(
        self,
        mapping: dict[int, int | None],
        requester_role: int,
    ) -> None:

        if requester_role != 20:
            raise PermissionError()

        today = date.today()

        start_date = today
        end_date = today + timedelta(days=13)

        plans = await self.meal_plan_repo.list_between(start_date, end_date)

        plans_by_date: dict[date, list] = defaultdict(list)
        for p in plans:
            plans_by_date[p.plan_date].append(p)

        input_count = len(mapping)
        if input_count == 0:
            await self.recurring_repo.clear_all()
            return

        if sorted(mapping.keys()) != list(range(1, input_count + 1)):
            raise ValueError("order_index must start from 1 and be continuous")

        last_used_index = 0

        for i in range(1, 15):
            current_date = today + timedelta(days=i - 1)

            if i <= input_count:
                order_index = i
            else:
                order_index = ((i - 1) % input_count) + 1

            last_used_index = order_index

            template_meal_id = mapping[order_index]

            if template_meal_id is None:
                continue

            existing_list = plans_by_date.get(current_date, [])

            match_found = any(p.meal_id == template_meal_id for p in existing_list)
            if match_found:
                continue

            for p in existing_list:
                await self.meal_plan_repo.delete(p.id)

            await self.meal_plan_repo.create(
                plan_date=current_date,
                meal_id=template_meal_id,
            )

        await self.recurring_repo.clear_all()

        batch_entities: list[MealPlanRecurringEntity] = []

        start_target_date = today + timedelta(days=14)

        for offset in range(input_count):
            idx = ((last_used_index + offset) % input_count) + 1
            target_date = start_target_date + timedelta(days=offset)
            meal_id = mapping[idx]

            batch_entities.append(
                MealPlanRecurringEntity(
                    id=0,
                    meal_id=meal_id,
                    target_date=target_date,
                    order_index=idx,
                )
            )

        if batch_entities:
            await self.recurring_repo.insert_many(batch_entities)
