import React, { useState } from "react";

const AddItemForm = ({ addItem }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            addItem(name);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add a new item"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddItemForm;
