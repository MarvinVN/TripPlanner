from fastapi import APIRouter
from pydantic import BaseModel
from services.trip_service import TripService
from models.trip import *

router = APIRouter(prefix="/trips")

class User_ID(BaseModel):
    user_id: str

@router.post("", response_model=int)
async def create_trip(trip: TripRequest):
    return await TripService.create_trip(trip)

@router.get("", response_model=Trips)
async def get_user_trips(user_id: User_ID):
    return await TripService.get_user_trips(user_id)
