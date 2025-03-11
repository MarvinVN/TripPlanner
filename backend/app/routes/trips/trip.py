from fastapi import APIRouter, Depends
from pydantic import BaseModel

from core.security import get_current_user
from models.trip import TripRequest, Trips
from services.trip_service import TripService

router = APIRouter(prefix="/trips")

class User_ID(BaseModel):
    user_id: str

@router.post("", response_model=int)
async def create_trip(trip: TripRequest, user = Depends(get_current_user)):
    return await TripService.create_trip(trip, user)

@router.get("", response_model=Trips)
async def get_user_trips(user_id: User_ID):
    return await TripService.get_user_trips(user_id)
