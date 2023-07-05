from pydantic import BaseModel
from typing import Optional

class Event(BaseModel):
    name: str
    description: Optional[str] = None
    

class UpdateEvent(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: bool