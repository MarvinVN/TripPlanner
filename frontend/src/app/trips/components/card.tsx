import { useState } from 'react';
import { Trip } from "@/app/types";
import Image from "next/image";
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from "@tabler/icons-react";
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function TripCard({ trip, fetchTrips }: { trip: Trip, fetchTrips: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getToken } = useAuth();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDialogOpenChange = (isOpen: boolean) => {
        setDeleteDialogOpen(isOpen);
        if (!isOpen) {
            setIsMenuOpen(false);
        }
    };

    const handleDelete = async () => {
        const token = await getToken();
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            await axios.delete(`http://localhost:8000/api/trips/trip`, {  
                headers: headers,
                params: { trip_id: trip.trip_id }
            });
            fetchTrips();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="bg-purple-300 grid grid-cols-12 gap-4 py-4 h-40">
            <div className="col-span-5">
                <Image
                    alt="Album cover"
                    className="object-cover"
                    height={220}
                    src="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/69000/69347-Tokyo.jpg"
                    width={220}
                />
            </div>
            <div className="col-span-6 flex flex-col justify-center">
                <CardContent>
                    <div>
                        <CardTitle className="text-2xl">{trip.title}</CardTitle>
                        <CardDescription className="text-md">{trip.description}</CardDescription>
                        {trip.start_date && trip.end_date && (
                            <p className="text-gray-500">{trip.start_date} - {trip.end_date}</p>
                        )}
                    </div>
                </CardContent>
            </div>
            <div className="flex flex-col">
                <DropdownMenu open={isMenuOpen} onOpenChange={handleMenuToggle}>
                    <DropdownMenuTrigger className="flex justify-end pr-2">
                        <div className="p-1 rounded-full bg-purple-300 hover:bg-purple-400">
                            <IconDotsVertical />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-20 w-50 bg-white shadow-lg rounded-md">
                        <div className="hover:bg-gray-100 rounded-t-md">
                            <DropdownMenuItem onClick={handleMenuToggle}>
                                <button className="block w-full text-left bg-white-100">
                                    <p className="text-black">Edit</p>
                                </button>
                            </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-gray-100 rounded-none">
                            <DropdownMenuItem onClick={handleMenuToggle} className="hover:bg-gray-100 rounded-none">
                                <button className="block w-full text-left bg-white-100">
                                    <p className="text-black">Duplicate</p>
                                </button>
                            </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-gray-100 rounded-none">
                            <DropdownMenuItem onClick={handleMenuToggle} className="hover:bg-gray-100 rounded-none">
                                <button className="block w-full text-left bg-white-100">
                                    <p className="text-black">Share</p>
                                </button>
                            </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-gray-100 rounded-b-md">
                            <DropdownMenuItem className="hover:bg-gray-100 rounded-b-md">
                                <Dialog open={deleteDialogOpen} onOpenChange={handleDialogOpenChange}>
                                    <DialogTrigger asChild>
                                        <button 
                                            className="block w-full text-left bg-white-100"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <p className="text-red-500">Delete</p>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="w-md">
                                        <DialogHeader>
                                            <DialogTitle>Are you sure you want to delete this trip?</DialogTitle>
                                            <DialogDescription>This action cannot be undone.</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                            <Button onClick={handleDelete} className="bg-red-500">Delete</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}