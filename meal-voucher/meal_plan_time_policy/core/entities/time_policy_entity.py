from dataclasses import dataclass
from datetime import time

@dataclass
class MealPlanTimePolicyEntity:
    id: int | None
    day_index: int
    offset_days: int
    cutoff_time: time
