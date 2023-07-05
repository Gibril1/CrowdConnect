from fastapi import APIRouter, Depends, status
from typing import List
from sqlalchemy.orm import Session
from .event_schemas import EventSchema, UpdateEventSchema, ResponseSchema
from .event_controllers import get_all, create, retrieve, delete, update
from config.db import get_db
from auth.oauth2 import get_current_user
from users.user_schemas import UserRegistration


event = APIRouter(
    prefix='/api/v1/event',
    tags=['Events']
)



@event.post('/create', status_code=status.HTTP_201_CREATED, response_model=ResponseSchema)
def create_event(event: EventSchema, db: Session = Depends(get_db) , current_user: UserRegistration = Depends(get_current_user)):
    return create(db, event, current_user)


@event.get('/{id}', status_code=status.HTTP_200_OK, response_model=ResponseSchema )
def get_event(id:int, db: Session = Depends(get_db) , current_user: UserRegistration = Depends(get_current_user)):
    return retrieve(id, db)


@event.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_event(id:int, db: Session = Depends(get_db), current_user: UserRegistration = Depends(get_current_user)):
    return delete(id, db)


@event.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def updated_event(id:int, event: UpdateEventSchema, db: Session = Depends(get_db),  current_user: UserRegistration = Depends(get_current_user)):
    return update(id, db, event)


@event.get('/', status_code=status.HTTP_200_OK, response_model=List[ResponseSchema])
def get_events(db: Session = Depends(get_db), current_user: UserRegistration = Depends(get_current_user)):
    return get_all(db)

