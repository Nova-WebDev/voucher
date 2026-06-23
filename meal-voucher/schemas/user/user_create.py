from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    phone: str
    username: str
    branch_id: str | None = None
    branch_role: int
