from dotenv import load_dotenv
from fastapi import FastAPI

from users.user_routes import user

load_dotenv()



app = FastAPI()
app.include_router(user)

@app.get("/")
async def root():
    return {"message": "Server is running"}
