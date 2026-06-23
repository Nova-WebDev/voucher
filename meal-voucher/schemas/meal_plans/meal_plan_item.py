from pydantic import BaseModel
from datetime import date

class MealPlanItem(BaseModel):
    id: int
    plan_date: date
    meal_id: int

    class Config:
        orm_mode = True
