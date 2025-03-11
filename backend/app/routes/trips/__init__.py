from fastapi import APIRouter
from .trip import router as trip_router

router = APIRouter()

router.include_router(trip_router)