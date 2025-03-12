from typing import Optional
from pydantic import BaseModel

class Trip(BaseModel):
    trip_id: int
    owner_id: str
    title: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    created_at: str
    updated_at: str

class Trips(BaseModel):
    owner_id: str
    trips: list[Trip]

class TripRequest(BaseModel):
    owner_id: str = None
    title: str
    description: str = None
    start_date: str= None
    end_date: str= None
