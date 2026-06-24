from pydantic import BaseModel
from typing import Dict, Optional


class RecurringInsertSchema(BaseModel):
    mapping: Dict[int, Optional[int]]
