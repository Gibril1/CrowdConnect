from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
from .user_models import User
from .user_schemas import UserRegistration, CurrentUser, EditUser, ChangePassword
from .hashing import Hash
from events.event_controllers import get_user_id
from auth.auth_controllers import create_access_token

def register(user:UserRegistration, db:Session):    
    # check if user with similar email already exists
    is_user = db.query(User).filter(User.email == user.email).first()
    if is_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User with similar email already exists')
        
    # # hash password and register user
    hashed_password = Hash.hash(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": new_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "username": new_user.username}
    
    

def edit_details(db:Session, user:EditUser, current_user:CurrentUser):
    id = get_user_id(current_user)
    updated_user = db.query(User).filter(User.id == id).first()
    updated_user.username = user.username
    updated_user.email = user.email 
    db.commit()
    return updated_user

def reset(db:Session, password: ChangePassword, current_user:CurrentUser):
    id = get_user_id(current_user)
    updated_user = db.query(User).filter(User.id == id).first()

    hashed_password = Hash.hash(password.password)

    updated_user.password = hashed_password

    db.commit()

    return 

