from abc import ABC, abstractmethod
from typing import List
from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity


class IMealPlanTimePolicyRepository(ABC):

    @abstractmethod
    async def list_all(self) -> List[MealPlanTimePolicyEntity]:
        pass

    @abstractmethod
    async def insert(self, entity: MealPlanTimePolicyEntity) -> MealPlanTimePolicyEntity:
        pass

    @abstractmethod
    async def update_by_day_index(self, day_index: int, offset_days: int, cutoff_time):
        pass

    @abstractmethod
    async def get_by_day_index(self, day_index: int):
        pass
