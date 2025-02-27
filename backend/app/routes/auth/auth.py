from fastapi import APIRouter
from services.auth_service import AuthService
from models.user import UserAuth, UserResponse

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserAuth):
    return await AuthService.signup(user)

@router.post("/login", response_model=UserResponse)
async def login(user: UserAuth):
    return await AuthService.login(user)
