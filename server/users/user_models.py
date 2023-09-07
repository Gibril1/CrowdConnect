from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from config.db import BASE

class User(BASE):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

    events = relationship('Event', back_populates='created_by')
    