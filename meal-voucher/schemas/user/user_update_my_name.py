from pydantic import BaseModel

class UpdateMyNameRequest(BaseModel):
    new_name: str
