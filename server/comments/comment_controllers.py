from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from .comments_schemas import CommentSchema
from .comment_models import Comment
from events.event_controllers import get_user_id
from events.event_models import Event
from config.db import SessionLocal

def get_event(payload):
    session = SessionLocal()
    event = session.query(Event).filter(Event.id == payload).first()
    if event:
        return event.id
    return None


def create(event_id:int, db:Session, comment_:CommentSchema, current_user):
    user = get_user_id(current_user)
    event = get_event(event_id)
    if event is not None:
        new_comment = Comment(
            comment = comment_.comment,
            user_id = user,
            events_id = event
        )
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        return new_comment
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Such event does not exist')
    
    
def get_comments(event_id:int, db:Session):
    event = get_event(event_id)
    if event is not None:
        return db.query(Comment).filter(Comment.events_id == event_id).all()
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Such event does not exist')
    
