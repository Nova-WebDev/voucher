from pydantic import BaseModel

class UserItem(BaseModel):
    public_id: str
    phone: str
    username: str
    role: int
    branch_id: str | None
    branch_role: int
    is_blocked: bool
