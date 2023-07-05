from dotenv import load_dotenv
from fastapi import FastAPI
from events import event_models

from config.db import engine

from users.user_routes import user
from events.event_routes import event

event_models.BASE.metadata.create_all(engine)
load_dotenv()



app = FastAPI()
app.include_router(user)
app.include_router(event)



@app.get("/")
async def root():
    return {"message": "Server is running"}
