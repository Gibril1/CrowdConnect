from fastapi import APIRouter, Depends, status
from typing import List
from sqlalchemy.orm import Session
from .event_schemas import EventSchema, UpdateEventSchema, ResponseSchema
from .event_controllers import get_all, create, retrieve, delete, update
from config.db import get_db



event = APIRouter(
    prefix='/api/v1/event',
    tags=['Events']
)



@event.post('/create', status_code=status.HTTP_201_CREATED, response_model=ResponseSchema)
def create_event(event: EventSchema, db: Session = Depends(get_db)):
    return create(db, event)


@event.get('/{id}', status_code=status.HTTP_200_OK, response_model=ResponseSchema )
def get_event(id:int, db: Session = Depends(get_db)):
    return retrieve(id, db)


@event.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_event(id:int, db: Session = Depends(get_db)):
    return delete(id, db)


@event.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def updated_event(id:int, event: UpdateEventSchema, db: Session = Depends(get_db)):
    return update(id, db, event)


@event.get('/', status_code=status.HTTP_200_OK, response_model=List[ResponseSchema])
def get_events(db: Session = Depends(get_db)):
    return get_all(db)

