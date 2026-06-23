from pydantic import BaseModel

class UpdateUserRequest(BaseModel):
    public_id: str
    phone: str
    username: str
    branch_id: str | None = None
    branch_role: int
