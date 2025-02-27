from pydantic import BaseModel
from typing import Optional 

class UserAuth(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    access_token: Optional[str] = None
