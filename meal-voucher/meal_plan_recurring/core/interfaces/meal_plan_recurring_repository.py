from abc import ABC, abstractmethod
from datetime import date
from typing import Iterable, Optional

from meal_plan_recurring.core.entities.meal_plan_recurring_entity import MealPlanRecurringEntity


class IMealPlanRecurringRepository(ABC):

    @abstractmethod
    async def clear_all(self) -> None:
        pass

    @abstractmethod
    async def insert_many(self, rows: Iterable[MealPlanRecurringEntity]) -> None:
        pass

    @abstractmethod
    async def list_between(self, start_date: date, end_date: date) -> list[MealPlanRecurringEntity]:
        pass

    @abstractmethod
    async def get_last(self) -> Optional[MealPlanRecurringEntity]:
        pass

    @abstractmethod
    async def update_target_date(self, row_id: int, new_date: date) -> None:
        pass

    @abstractmethod
    async def get_all(self) -> list[MealPlanRecurringEntity]:
        pass