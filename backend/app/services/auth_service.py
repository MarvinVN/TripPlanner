from fastapi import HTTPException
from db.supabase import supabase
from models.user import UserAuth, UserResponse

class AuthService:

    @staticmethod
    async def signup(user: UserAuth):
        try:
            response = supabase.auth.sign_up({
                "email": user.email,
                "password": user.password
            })

            if response.user:
                return UserResponse(
                    email=user.email,
                    access_token=response.session.access_token if response.session else None
                )
            else:
                raise HTTPException(status_code=400, detail="Failed to create")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        
    @staticmethod
    async def login(user: UserAuth):
        try:
            response = supabase.auth.sign_in_with_password({
                "email": user.email,
                "password": user.password
            })
            return UserResponse(
                email=response.user.email,
                access_token=response.session.access_token
            )
        except Exception as e:
            print(f"Login failed: {e}")
            raise HTTPException(status_code=400, detail=str(e))
