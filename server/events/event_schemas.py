from pydantic import BaseModel
from typing import Optional, List
from comments.comments_schemas import CommentSchema
class EventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    
    

class UpdateEventSchema(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: bool = False

class EntrySchema(BaseModel):
    entry_code: str


class AvailabilitySchema(BaseModel):
    id: int
    entry_code: str
    description: Optional[str] = None
    is_active: bool
    comment:  List[CommentSchema]

    class Config:
        orm_mode = True
    
class ResponseSchema(EventSchema):
    id: int
    entry_code: str
    description: Optional[str] = None
    is_active: bool 
    class Config:
        orm_mode = True