from pydantic import BaseModel


class CheckVoucherRequest(BaseModel):
    meal_plan_id: int
