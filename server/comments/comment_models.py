from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.db import BASE

class Comment(BASE):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String)
    # user_id = Column(Integer, ForeignKey('users.id'))
    events_id = Column(Integer, ForeignKey('events.id'))

    # created_by = relationship('User', back_populates='comments')
    events = relationship('Event', back_populates='comments')
