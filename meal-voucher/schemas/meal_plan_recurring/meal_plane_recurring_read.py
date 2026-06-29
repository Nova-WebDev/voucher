from pydantic import BaseModel
from datetime import date

class MealPlanRecurringRead(BaseModel):
    id: int
    meal_id: int | None
    target_date: date
    order_index: int
