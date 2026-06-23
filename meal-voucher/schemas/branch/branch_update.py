from pydantic import BaseModel

class UpdateBranchRequest(BaseModel):
    id: str
    name: str
