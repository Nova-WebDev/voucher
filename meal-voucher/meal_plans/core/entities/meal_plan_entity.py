from dataclasses import dataclass
from datetime import date

@dataclass
class MealPlanEntity:
    id: int
    plan_date: date
    meal_id: int
