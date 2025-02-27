from fastapi import APIRouter, Depends
from services.item_service import ItemService
from models.item import Item, Items
from core.security import get_current_user

router = APIRouter(prefix="/items")

@router.get("", response_model=Items)
async def get_items(user = Depends(get_current_user)):
    return await ItemService.get_items()

@router.post("", response_model=Item)
async def add_item(item: Item, user = Depends(get_current_user)):
    return await ItemService.add_item(item)
