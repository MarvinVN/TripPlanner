from fastapi import Depends, HTTPException
from pydantic import BaseModel

from core.security import get_current_user
from db.supabase import supabase
from models.trip import TripRequest, Trips, Trip

class TripService:

    @staticmethod
    async def create_trip(trip: TripRequest, user = Depends(get_current_user)):
        try:
            trip.owner_id = user.user.id
            trip_dict = vars(trip)
            response = (
                supabase.table('tbl_trips')
                .insert(trip_dict)
                .execute()
            )
            return response.data[0]['trip_id']
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=str(e))
        
    @staticmethod
    async def get_trip(trip_id: int, user = Depends(get_current_user)):
        try:
            response = (
                supabase.table('tbl_trips')
                .select('*')
                .eq('trip_id', trip_id)
                .eq('owner_id', user.user.id)
                .execute()
            )
            return Trip(**response.data[0])
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=str(e))
    
    @staticmethod
    async def get_user_trips(user = Depends(get_current_user)):
        try:
            response = (
                supabase.table('tbl_trips')
                .select('*')
                .eq('owner_id', user.user.id)
                .execute()
            )
            return [Trip(**trip) for trip in response.data]
        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=str(e))