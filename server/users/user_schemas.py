from pydantic import BaseModel
from typing import List
from events.event_schemas import ResponseSchema

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str

class RegisterResponse(BaseModel):
    username: str
    email: str
    blog: List[ResponseSchema] = []
    class Config:
        orm_mode = True

