from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    name: str

class Items(BaseModel):
    items: List[Item]
