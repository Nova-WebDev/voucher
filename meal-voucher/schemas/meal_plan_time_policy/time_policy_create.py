from datetime import time
from pydantic import BaseModel


class MealPlanTimePolicyCreate(BaseModel):
    day_index: int
    offset_days: int
    cutoff_time: time
