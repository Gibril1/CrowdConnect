from pydantic import BaseModel
from typing import List
from events.event_schemas import ResponseSchema

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str

class ChangePassword(BaseModel):
    password: str

class EditUser(BaseModel):
    username: str
    email: str
    

class CurrentUser(UserRegistration):
    id: int

class RegisterResponse(BaseModel):
    username: str
    email: str
    
    class Config:
        orm_mode = True
