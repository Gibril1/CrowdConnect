from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .user_schemas import UserRegistration, RegisterResponse, EditUser,ChangePassword
from .user_controllers import register, edit_details, reset
from config.db import get_db
from auth.oauth2 import get_current_user
from users.user_schemas import CurrentUser


user = APIRouter(
    prefix='/api/v1/users',
    tags=['Users']
)


@user.post('/register', status_code=status.HTTP_201_CREATED, response_model=RegisterResponse)
def create_user(user:UserRegistration, db:Session = Depends(get_db)):
    return register(user, db)


@user.put('/edit-details',status_code=status.HTTP_200_OK,response_model = RegisterResponse)
def edit_account_details(user:EditUser, 
            db:Session = Depends(get_db),
            current_user:CurrentUser = Depends(get_current_user)):
    return edit_details(db, user, current_user)

@user.put('change-password', status_code=status.HTTP_200_OK)
def change_password(password:ChangePassword, 
                    db:Session = Depends(get_db), 
                    current_user = Depends(get_current_user)):
    return reset(db, password, current_user)

