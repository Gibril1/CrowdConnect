from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .user_schemas import UserRegistration, RegisterResponse

from .user_controllers import register
from config.db import get_db

user = APIRouter(
    prefix='/api/v1/users',
    tags=['Users']
)


@user.post('/register', status_code=status.HTTP_201_CREATED, response_model=RegisterResponse)
def create_user(user:UserRegistration, db:Session = Depends(get_db)):
    return register(user, db)

