from sqlalchemy import Column, Integer, String, Boolean
from config.db import BASE

class EventSchema(BASE):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)