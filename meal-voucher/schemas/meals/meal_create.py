from pydantic import BaseModel

class MealCreateRequest(BaseModel):
    title: str
    description: str | None = None
