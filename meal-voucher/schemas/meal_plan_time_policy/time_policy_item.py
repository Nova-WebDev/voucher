from datetime import time
from pydantic import BaseModel


class MealPlanTimePolicyItem(BaseModel):
    id: int
    day_index: int
    offset_days: int
    cutoff_time: time
