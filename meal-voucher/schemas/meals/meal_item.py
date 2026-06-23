from pydantic import BaseModel

class MealItem(BaseModel):
    id: int
    title: str
    description: str | None
    img_id: str | None
    is_active: bool
