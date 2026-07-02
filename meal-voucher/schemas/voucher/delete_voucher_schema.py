from pydantic import BaseModel


class DeleteVoucherRequest(BaseModel):
    meal_plan_id: int
