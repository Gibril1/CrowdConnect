from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from config.db import BASE, SessionLocal
import random

class Event(BASE):
    __tablename__ = 'events'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    entry_code = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))

    created_by = relationship('User', back_populates='events')

    def __init__(self, name: str, description: str = None):
        self.name = name
        self.description = description
        self.get_entry_code()


    @staticmethod
    def generate_random_numbers_string():
        numbers = []
        for _ in range(6):
            number = random.randint(0, 9)
            numbers.append(str(number))
        numbers_string = ''.join(numbers)
        return numbers_string
    
    def get_entry_code(self):
        session = SessionLocal()
        entry_code = self.generate_random_numbers_string()
        event = session.query(Event).filter(Event.entry_code == entry_code).filter(Event.is_active == False).first()
        if not event:
            self.entry_code = entry_code
            session.commit()
        else:
            self.get_entry_code()

