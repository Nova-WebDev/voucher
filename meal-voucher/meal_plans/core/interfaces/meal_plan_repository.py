from abc import ABC, abstractmethod
from datetime import date
from meal_plans.core.entities.meal_plan_entity import MealPlanEntity


class IMealPlanRepository(ABC):

    @abstractmethod
    async def create(self, plan_date: date, meal_id: int) -> MealPlanEntity:
        pass

    @abstractmethod
    async def get_by_date_and_meal(self, plan_date: date, meal_id: int) -> MealPlanEntity | None:
        pass

    @abstractmethod
    async def list_between(self, start_date: date, end_date: date) -> list[MealPlanEntity]:
        pass

    @abstractmethod
    async def update_meal(self, plan_id: int, meal_id: int) -> MealPlanEntity:
        pass

    @abstractmethod
    async def get_by_id(self, plan_id: int) -> MealPlanEntity | None:
        pass

    @abstractmethod
    async def delete(self, plan_id: int) -> None:
        pass

