from dataclasses import dataclass

@dataclass
class MealEntity:
    id: int
    title: str
    description: str | None
    img_id: str | None
    is_active: bool
