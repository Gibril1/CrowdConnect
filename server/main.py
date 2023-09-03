from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from events import event_models

from config.db import engine

from users.user_routes import user
from events.event_routes import event
from auth.auth_routes import auth
from comments.comments_routes import comments
event_models.BASE.metadata.create_all(engine)

origins = [
    "http://localhost",
    "http://localhost:5173",
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user)
app.include_router(auth)
app.include_router(comments)
app.include_router(event)



@app.get("/")
async def root():
    return {"message": "Server is running"}
