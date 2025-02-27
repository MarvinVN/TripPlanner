import React, { useState, useEffect } from "react";
import api from "../api";
import AddItemForm from "./addItemForm";

const ItemList = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await api.get("/api/items");
            setItems(response.data.items);
        } catch (error) { 
            console.error("Error fetching items:", error);
        }
    };

    const addItem = async (item) => {
        try {
            console.log(item);
            await api.post("/api/items", { name: item });
            fetchItems();
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
            <AddItemForm addItem={addItem} />
        </div>
    );
};

export default ItemList;