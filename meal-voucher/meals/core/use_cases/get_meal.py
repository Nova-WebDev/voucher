from meals.core.entities.meal_entity import MealEntity
from meals.core.interfaces.meal_repository import IMealRepository
from meals.core.interfaces.meal_store import IMealStore


class GetMeal:
    def __init__(self, repository: IMealRepository, store: IMealStore):
        self.repository = repository
        self.store = store

    async def execute(self, meal_id: int) -> MealEntity | None:
        cached = await self.store.get(meal_id)
        if cached:
            return cached

        meal = await self.repository.get_by_id(meal_id)
        if not meal:
            return None

        await self.store.save(meal)
        return meal

