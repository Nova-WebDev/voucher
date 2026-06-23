from pydantic import BaseModel

class DeleteBranchRequest(BaseModel):
    id: str
