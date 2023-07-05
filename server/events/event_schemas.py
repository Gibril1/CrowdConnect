from pydantic import BaseModel
from typing import Optional

class EventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    
    

class UpdateEventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: bool = False


class ResponseSchema(EventSchema):
    id: int
    entry_code: str
    class Config:
        orm_mode = True