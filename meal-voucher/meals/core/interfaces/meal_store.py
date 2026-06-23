from abc import ABC, abstractmethod
from typing import Optional
from meals.core.entities.meal_entity import MealEntity


class IMealStore(ABC):

    @abstractmethod
    async def get(self, meal_id: int) -> Optional[MealEntity]:
        pass

    @abstractmethod
    async def save(self, data: MealEntity) -> None:
        pass

    @abstractmethod
    async def delete(self, meal_id: int) -> None:
        pass

