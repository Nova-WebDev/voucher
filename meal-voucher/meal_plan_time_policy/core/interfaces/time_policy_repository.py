from abc import ABC, abstractmethod
from typing import List
from meal_plan_time_policy.core.entities.time_policy_entity import MealPlanTimePolicyEntity


class IMealPlanTimePolicyRepository(ABC):

    @abstractmethod
    async def list_all(self) -> List[MealPlanTimePolicyEntity]:
        pass
