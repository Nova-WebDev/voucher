from pydantic import BaseModel


class CreateVoucherRequest(BaseModel):
    meal_plan_id: int
