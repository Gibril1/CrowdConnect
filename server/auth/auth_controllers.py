from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .token import create_access_token
from users.user_models import User
from users.hashing import Hash

def login(user:OAuth2PasswordRequestForm, db:Session):
    user_exists = db.query(User).filter(User.email == user.username).first()
    if not user_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Credentials')
    if not Hash.verify(user.password, user_exists.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Credentials')

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_exists.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

    