from meals.core.interfaces.meal_repository import IMealRepository

class ListMeals:
    def __init__(self, repository: IMealRepository):
        self.repository = repository

    async def execute(self)  -> list:
        return await self.repository.list_all()
