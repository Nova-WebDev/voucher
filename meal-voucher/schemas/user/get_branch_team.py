from pydantic import BaseModel

class GetBranchTeamRequest(BaseModel):
    branch_id: str

class GetBranchTeamResponse(BaseModel):
    public_ids: list[str]
