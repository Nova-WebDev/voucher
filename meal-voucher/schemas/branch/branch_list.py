from pydantic import BaseModel
from typing import List
from .branch_item import BranchItem

class BranchListResponse(BaseModel):
    items: List[BranchItem]
