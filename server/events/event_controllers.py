from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from config.db import SessionLocal
from .event_models import Event
from .event_schemas import EventSchema, UpdateEventSchema, EntrySchema, AvailabilitySchema
from users.user_schemas import CurrentUser
from users.user_models import User
from comments.comment_models import Comment
from comments.comments_schemas  import CommentSchema

def get_user_id(payload):
    session = SessionLocal()
    user = session.query(User).filter(User.email == payload.email).first()
    if user:
        return user.id
    return None


def create(db: Session, event:EventSchema, current_user:CurrentUser):
    user = get_user_id(current_user)
    new_event = Event(name=event.name, description=event.description, user_id = user)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


def get_all(db: Session, current_user:CurrentUser):
    user = get_user_id(current_user)
    events = db.query(Event).filter(Event.user_id==user).all()
    return events

def retrieve(id:int, db:Session, current_user:CurrentUser):
    user = get_user_id(current_user)
    event = db.query(Event).filter(Event.id == id).filter(Event.user_id == user).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'You do not have such event')
    return event

def delete(id: int, db: Session, current_user: CurrentUser):
    user = get_user_id(current_user)
    event = db.query(Event).filter(Event.id == id, Event.user_id == user).first()

    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')

    event_id = event.id
    db.delete(event)
    db.commit()
    return event_id



def update(id: int, db: Session, event: UpdateEventSchema, current_user: CurrentUser):
    user = get_user_id(current_user)
    
    updated_event = db.query(Event).filter(Event.id == id, Event.user_id == user).first()
    
    if not updated_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Event not found')
    
    for attr, value in event.dict().items():
        setattr(updated_event, attr, value)
    db.commit()
    return updated_event


def check_event(entry:EntrySchema, db:Session):
    event = db.query(Event).filter(Event.entry_code == entry.entry_code).filter(Event.is_active == True).first()
    if event:
        comments = db.query(Comment).filter(Comment.events_id == event.id).all()
    
        return {'event': event, 'comments':comments}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect entry code')


