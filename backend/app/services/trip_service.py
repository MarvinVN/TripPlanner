from fastapi import Depends, HTTPException
from pydantic import BaseModel

from core.security import get_current_user
from db.supabase import supabase
from models.trip import TripRequest

class TripService:

    class User_ID(BaseModel):
        user_id: str

    @staticmethod
    async def create_trip(trip: TripRequest, user = Depends(get_current_user)):
        try:
            print("UNGAUNGAUGNA")
            trip.owner_id = user.user.id
            print("BYUNBAUYBNA")
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
    async def get_user_trips(user_id: User_ID):
        print(user_id)
        print(type(user_id))
        print(user_id.user_id)
        print(supabase.auth.get_user()['id'])
        try:
            response = (
                supabase.table('tbl_trips')
                .select('*')
                .eq('owner_id', supabase.auth.get_user()['id'])
                .execute()
            )
            return response.data
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))