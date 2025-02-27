from fastapi import HTTPException
from db.supabase import supabase
from models.item import Item, Items

class ItemService:

    @staticmethod
    async def add_item(item: Item):
        response = (
            supabase.table("tbl_test")
            .insert({"name": item.name})
            .execute()
        )
        return item
    
    @staticmethod
    async def get_items():
        response = (
            supabase.table("tbl_test")
            .select({"name"})
            .execute()
        )
        return Items(items=response.data)