from fastapi import APIRouter

from . import auth, item, trips

router = APIRouter(prefix="/api")

router.include_router(auth.router)
router.include_router(item.router)
router.include_router(trips.router)
