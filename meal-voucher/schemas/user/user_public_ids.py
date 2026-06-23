from pydantic import BaseModel
from typing import List

class UsersByPublicIdsRequest(BaseModel):
    public_ids: List[str]
