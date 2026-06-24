from dataclasses import dataclass
from datetime import date
from typing import Optional


@dataclass
class MealPlanRecurringEntity:
    id: int
    meal_id: Optional[int]
    target_date: date
    order_index: int
