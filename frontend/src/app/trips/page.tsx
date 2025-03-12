"use client";

import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trip } from '../types';

export default function Trips() {

    const [title, setTitle] = React.useState('');
    const { getToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await getToken()
        try {
            console.log(title)
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const { data } = await axios.post('http://localhost:8000/api/trips', { "title": title }, { headers });
            console.log(data);
            setTitle('');
        } catch (error) {
            console.error(error);
        }
    }

    const [trips, setTrips] = React.useState([]);
    React.useEffect(() => {
        const fetchTrips = async () => {
            const token = await getToken();
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                const { data } = await axios.get('http://localhost:8000/api/trips', { headers });
                setTrips(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrips();
    }, [getToken]);

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
                    <button type="submit" className="w-full px-3 py-2 mt-1 bg-indigo-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        Submit
                    </button>
                </form>
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">Trips</h2>
                    <ul className="space-y-4">
                        {trips.map((trip: Trip) => (
                            <li key={trip.trip_id} className="p-4 border border-gray-300 rounded-md shadow-sm">
                                <h3 className="text-xl font-bold text-gray-200">{trip.title}</h3>
                                <p className="text-gray-400">{trip.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}