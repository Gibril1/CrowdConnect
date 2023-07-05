from fastapi import status, HTTPException
from sqlalchemy.orm import Session 
from .event_models import Event
from .event_schemas import EventSchema, UpdateEventSchema

def create(db: Session, event:EventSchema, current_user):
    new_event = Event(name=event.name, description=event.description, user_id = current_user)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


def get_all(db: Session):
    events = db.query(Event).all()
    return events

def retrieve(id:int, db:Session):
    event = db.query(Event).filter(Event.id == id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id { id } not found')
    return event

def delete(id:int, db:Session):
    event = db.query(Event).filter(Event.id == id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id {id} not found')
    event.delete(synchronize_session=False)
    db.commit()
    return

def update(id:int, db:Session, event:UpdateEventSchema):
    updated_event = db.query(Event).filter(Event.id == id)
    if not updated_event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id {id} not found')
    updated_event.update(event)
    db.commit()
    return updated_event