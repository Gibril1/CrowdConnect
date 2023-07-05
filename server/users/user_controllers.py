from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from .user_models import User
from .user_schemas import UserRegistration
from .hashing import Hash


def register(user:UserRegistration, db:Session):
    # check if user with similar email already exists
    is_user = db.query(User).filter(User.email == user.email).first()
    if is_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User with similar email already exists')
    
    # hash password and register user
    hashed_password = Hash.hash(user.password)
    new_user = User(name=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

