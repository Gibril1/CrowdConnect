from fastapi import APIRouter, Depends, Response, status, HTTPException
from sqlalchemy.orm import Session
from .event_models import Event, UpdateEvent
from .event_schemas import EventSchema
from config.db import SessionLocal



event = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@event.post('/create', status_code=201)
def create_event(event: Event, db: Session = Depends(get_db)):
    new_event = EventSchema(
        name = event.name,
        description= event.description
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@event.get('/event/{id}', status_code=status.HTTP_201_CREATED)
def get_event(id, db: Session = Depends(get_db)):
    event = db.query(EventSchema).filter(EventSchema.id == id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id { id } not found')
    return event

@event.delete('/event/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_event(id, db: Session = Depends(get_db)):
    event = db.query(EventSchema).filter(EventSchema.id == id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id {id} not found')
    event.delete(synchronize_session=False)
    db.commit()
    return

@event.put('/event/{id}', status_code=status.HTTP_202_ACCEPTED)
def updated_event(id, response: Response, event: UpdateEvent, db: Session = Depends(get_db)):
    updated_event = db.query(EventSchema).filter(EventSchema.id == id)
    if not updated_event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with id {id} not found')
    updated_event.update(event)
    db.commit()
    return updated_event

@event.get('/events', status_code=status.HTTP_200_OK)
def get_events(db: Session = Depends(get_db)):
    events = db.query(EventSchema).all()
    return events

