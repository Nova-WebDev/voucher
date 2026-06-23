from pydantic import BaseModel

class BlockUserRequest(BaseModel):
    public_id: str
    block: bool
