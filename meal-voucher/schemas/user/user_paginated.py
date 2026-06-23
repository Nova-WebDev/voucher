from pydantic import BaseModel
from typing import List
from .user_item import UserItem

class UsersPaginatedResponse(BaseModel):
    users: List[UserItem]
    total_count: int
