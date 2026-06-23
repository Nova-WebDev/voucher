from datetime import time
from pydantic import BaseModel

class MealPlanTimePolicyUpdate(BaseModel):
    day_index: int
    offset_days: int
    cutoff_time: time
