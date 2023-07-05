from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .user_models import User
from .user_schemas import UserRegistration, UserLogin

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def register(user:UserRegistration, db:Session):
    # check if user with similar email already exists
    user = db.query(User).filter(User.email == user.email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User with similar email already exists')
    
    # hash password and register user
    hashed_password = pwd_context.hash(user.password)
    new_user = User(name=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login(user:UserLogin, db:Session):
    return user