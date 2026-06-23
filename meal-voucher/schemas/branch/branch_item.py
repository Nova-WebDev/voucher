from pydantic import BaseModel

class BranchItem(BaseModel):
    id: str
    name: str
