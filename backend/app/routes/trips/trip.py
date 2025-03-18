from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from core.security import get_current_user
from models.trip import Trip, TripRequest, Trips
from services.trip_service import TripService

router = APIRouter(prefix="/trips")

class User_ID(BaseModel):
    user_id: str

@router.post("", response_model=int)
async def create_trip(trip: TripRequest, user = Depends(get_current_user)):
    try:
        return await TripService.create_trip(trip, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/trip", response_model=Trip)
async def get_trip(trip_id: int, user = Depends(get_current_user)):
    try:
        return await TripService.get_trip(trip_id, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("", response_model=list[Trip])
async def get_user_trips(user = Depends(get_current_user)):
    try:
        return await TripService.get_user_trips(user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/trip")
async def delete_trip(trip_id: int, user = Depends(get_current_user)):
    try:
        return await TripService.delete_trip(trip_id, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))