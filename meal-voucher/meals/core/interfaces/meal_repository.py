from abc import ABC, abstractmethod
from meals.core.entities.meal_entity import MealEntity

class IMealRepository(ABC):

    @abstractmethod
    async def create(
        self,
        title: str,
        description: str | None,
        img_id: str | None,
    ) -> MealEntity:
        pass

    @abstractmethod
    async def get_by_id(
        self,
        meal_id: int,
    ) -> MealEntity | None:
        pass

    @abstractmethod
    async def update_is_active(self, meal_id: int, is_active: bool) -> None:
        pass

    @abstractmethod
    async def update(
        self,
        meal_id: int,
        title: str,
        description: str | None,
        img_id: str | None,
    ) -> MealEntity:
        pass