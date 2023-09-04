from pydantic import BaseModel
from typing import Optional

class EventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    
    

class UpdateEventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: bool = False

class EntrySchema(BaseModel):
    entry_code: str


# class ResponseEntryCode(EntrySchema):
#     class Config:
#         orm_mode = True
    
class ResponseSchema(EventSchema):
    id: int
    entry_code: str
    description: Optional[str] = None
    is_active: bool 
    class Config:
        orm_mode = True