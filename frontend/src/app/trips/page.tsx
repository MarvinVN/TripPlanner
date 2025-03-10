"use client";

import React from 'react';
import axios from 'axios';

export default function Trips() {

    const [title, setTitle] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(title)
            const { data } = await axios.post('http://localhost:8000/api/trips', { "title": title });
            console.log(data);
            setTitle('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='App flex h-screen'>
            <div className="w-full max-w-md mx-auto mt-10">
                <h1 className="text-3xl font-bold text-gray-300 mb-6">Create a Trip</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter trip title"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}