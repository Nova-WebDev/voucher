from meal_plan_recurring.core.interfaces.meal_plan_recurring_repository import IMealPlanRecurringRepository

class GetAllMealPlanRecurringUseCase:
    def __init__(self, repo: IMealPlanRecurringRepository):
        self.repo = repo

    async def execute(self, role):
        if role < 20:
            raise PermissionError
        return await self.repo.get_all()
