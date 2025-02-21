from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

from supabase import create_client, Client

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str

class Items(BaseModel):
    items: List[Item]

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        user = supabase.auth.get_user(credentials.credentials)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=403,
            detail="Could not validate credentials"
        )

@app.get("/items", response_model=Items)
def get_items(user = Depends(get_current_user)):
    response = (
        supabase.table("tbl_test")
        .select("name")
        .execute()
    )
    return Items(items=response.data)

@app.post("/items", response_model=Item)
def add_item(item: Item, user = Depends(get_current_user)):
    response = (
        supabase.table("tbl_test")
        .insert({"name": item.name})
        .execute()
    )
    return item

class UserAuth(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    access_token: Optional[str] = None

@app.post("/auth/signup", response_model=UserResponse)
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
            raise HTTPException(status_code=400, detail="Failed to create user")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/auth/login", response_model=UserResponse)
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
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 

