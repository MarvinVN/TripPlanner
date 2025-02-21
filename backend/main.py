import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
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

memory_db = {"items": []}

@app.get("/items", response_model=Items)
def get_items():
    #return Items(items=memory_db["items"])
    response = (
        supabase.table("tbl_test")
        .select("name")
        .execute()
    )
    return Items(items=response.data)

@app.post("/items", response_model=Item)
def add_item(item: Item):
    #memory_db["items"].append(item)    
    response = (
        supabase.table("tbl_test")
        .insert({"name": item.name})
        .execute()
    )
    return item

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 

