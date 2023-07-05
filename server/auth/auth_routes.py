from fastapi import APIRouter, Depends, status
# from fastapi.security import OAuth2PasswordRequestForm
from .auth_schema import UserLogin
from sqlalchemy.orm import Session
from config.db import get_db
from .auth_controllers import login

auth = APIRouter(
    prefix='/api/v1/auth',
    tags=['Authentication']
)

@auth.post('/login', status_code=status.HTTP_200_OK)
def login_user(user:UserLogin, db:Session = Depends(get_db)):
    return login(user, db)