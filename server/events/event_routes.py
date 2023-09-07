from fastapi import APIRouter, Depends, status
from typing import List
from sqlalchemy.orm import Session

from .event_schemas import (
    EventSchema, 
    UpdateEventSchema, 
    ResponseSchema, 
    EntrySchema, 
    AvailabilitySchema
    )

from .event_controllers import (
    get_all, 
    create, 
    retrieve, 
    delete, 
    update, 
    check_event
    )
from config.db import get_db
from auth.oauth2 import get_current_user
from users.user_schemas import CurrentUser


event = APIRouter(
    prefix='/api/v1/event',
    tags=['Events']
)


# @desc Create Events
@event.post('/create', status_code=status.HTTP_201_CREATED, response_model=ResponseSchema)
def create_event(event: EventSchema, db: Session = Depends(get_db) , current_user: CurrentUser = Depends(get_current_user)):
    return create(db, event, current_user)


# @user enters the entry code to comment on an event
@event.post('/event', status_code=status.HTTP_200_OK)
def check_event_availability(entry:EntrySchema, db:Session=Depends(get_db)):
    return check_event(entry, db)


@event.get('/{id}', status_code=status.HTTP_200_OK, response_model=ResponseSchema )
def get_event_details(id:int, db: Session = Depends(get_db) , current_user: CurrentUser = Depends(get_current_user)):
    return retrieve(id, db, current_user)


@event.delete('/{id}', status_code=status.HTTP_200_OK)
def delete_event(id:int, db: Session = Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
    return delete(id, db, current_user)


@event.put('/{id}', status_code=status.HTTP_202_ACCEPTED,response_model=ResponseSchema)
def update_event(id:int, event: UpdateEventSchema, db: Session = Depends(get_db),  current_user: CurrentUser = Depends(get_current_user)):
    return update(id, db, event, current_user)


# @desc Get all Events for a particular user
@event.get('/', status_code=status.HTTP_200_OK, response_model=List[ResponseSchema])
def get_events(db: Session = Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
    return get_all(db, current_user)




