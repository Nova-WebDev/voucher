from dataclasses import dataclass
from datetime import datetime


@dataclass
class VoucherEntity:
    id: int
    user_public_id: str
    meal_plan_id: int
    created_at: datetime
