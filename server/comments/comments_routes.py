from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from config.db import get_db
from .comment_controllers import create, get_comments
from .comments_schemas import CommentSchema
from auth.oauth2 import get_current_user


comments = APIRouter(
    prefix='/api/v1/comments',
    tags=['Comments']
)



@comments.post('/{event_id}', status_code=status.HTTP_201_CREATED)
def create_comments(event_id:int, comment_:CommentSchema,db:Session=Depends(get_db)):
    return create(event_id, db, comment_)

@comments.get('/{event_id}', status_code=status.HTTP_201_CREATED)
def get_event_comments(event_id:int, db:Session=Depends(get_db), current_user = Depends(get_current_user)):
    return get_comments(event_id, db)

