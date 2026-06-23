from meals.core.interfaces.meal_repository import IMealRepository
from meals.core.interfaces.meal_store import IMealStore


class ToggleMealActive:
    def __init__(self, repository: IMealRepository, store: IMealStore):
        self.repository = repository
        self.store = store

    async def execute(self, meal_id: int, is_active: bool, requester_role: int) -> None:
        if requester_role != 20:
            raise PermissionError()

        await self.repository.update_is_active(meal_id, is_active)
        await self.store.delete(meal_id)
