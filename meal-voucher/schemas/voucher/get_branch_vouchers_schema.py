from pydantic import BaseModel


class GetBranchVouchersRequest(BaseModel):
    meal_plan_id: int
