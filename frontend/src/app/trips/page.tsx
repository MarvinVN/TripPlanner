"use client";

import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trip } from '../types';
import { TripCard } from './components/card';
import { CreateTripCard } from './components/create-trip-card';
import PageHeader from '@/components/page-header';

export default function Trips() {

    const { getToken } = useAuth();
    const [trips, setTrips] = React.useState([]);

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

    React.useEffect(() => {
        fetchTrips();
    }, [getToken]);

    return (
        <div>
            <PageHeader/>
            <div className='App flex h-screen'>
                <div className="w-full max-w-2xl mx-auto mt-10">
                    <h1 className="text-3xl font-bold text-gray-500 mb-6">Create a Trip</h1>
                    <div>
                        <TripCard trip={{ trip_id: 1, owner_id: "1", title: 'Trip 1', description: 'Trip 1 description', start_date: '2021-10-01', end_date: '2021-10-10', created_at: '2021-09-01', updated_at: '2021-09-01' }}>
                        </TripCard>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-500 mb-4">Trips</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <CreateTripCard onTripCreated={fetchTrips}></CreateTripCard>
                        {trips.slice().reverse().map((trip: Trip) => (
                            <div key={trip.trip_id}>
                                <TripCard trip={trip} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}