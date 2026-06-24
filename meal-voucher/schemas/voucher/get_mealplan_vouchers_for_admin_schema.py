from pydantic import BaseModel


class GetMealPlanVouchersForAdminRequest(BaseModel):
    meal_plan_id: int
