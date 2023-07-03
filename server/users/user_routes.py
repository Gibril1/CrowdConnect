from fastapi import APIRouter
from users.user_models import UserRegistration, UserLogin
user = APIRouter()

@user.post('/register')
async def create_user(user:UserRegistration):
    return user

@user.post('/login')
async def create_user(user:UserLogin):
    return user