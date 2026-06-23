from pydantic import BaseModel
from typing import List, Dict


class MealItemOut(BaseModel):
    id: int
    meal_id: int


class WeekMealPlans(BaseModel):
    root: Dict[str, List[MealItemOut]]