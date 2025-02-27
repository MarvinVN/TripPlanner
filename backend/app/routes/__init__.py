from fastapi import APIRouter

from . import auth, item

router = APIRouter(prefix="/api")

router.include_router(auth.router)
router.include_router(item.router)
