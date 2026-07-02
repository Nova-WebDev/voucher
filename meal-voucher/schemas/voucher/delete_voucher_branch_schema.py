from pydantic import BaseModel
from typing import List


class DeleteVoucherBranchRequest(BaseModel):
    meal_plan_id: int
    public_ids: List[str]
