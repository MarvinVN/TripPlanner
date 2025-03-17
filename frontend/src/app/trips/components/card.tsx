import { useState } from 'react';
import { Trip } from "@/app/types";
import Image from "next/image";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { IconDotsVertical } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function TripCard({ trip }: { trip: Trip }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }

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
                    <div >
                        <CardTitle className="text-2xl">{trip.title}</CardTitle>
                        <CardDescription className="text-md">{trip.description}</CardDescription>
                        {trip.start_date && trip.end_date && (
                            <p className="text-gray-500">{trip.start_date} - {trip.end_date}</p>
                        )}
                    </div>
                </CardContent>
            </div>
            <div className="flex flex-col">
                <Popover open={isPopoverOpen} onOpenChange={handlePopoverToggle}>
                    <PopoverTrigger className="flex justify-end pr-2">
                        <div className="p-1 rounded-full bg-purple-300 hover:bg-purple-400">
                            <IconDotsVertical/>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 mr-20 w-50 bg-white shadow-lg rounded-md">
                        <ul className="list-none m-0">
                            <li><button className="block w-full text-left p-2 bg-white-100 hover:bg-gray-100 rounded-t-md" onClick={handlePopoverToggle}><p className="pl-1 text-black">Edit</p></button></li>
                            <li><button className="block w-full text-left p-2 bg-white-100 hover:bg-gray-100 rounded-none" onClick={handlePopoverToggle}><p className="pl-1 text-black">Duplicate</p></button></li>
                            <li><button className="block w-full text-left p-2 bg-white-100 hover:bg-gray-100 rounded-b-md" onClick={handlePopoverToggle}><p className="pl-1 text-black">Share</p></button></li>
                            <li><button className="block w-full text-left p-2 bg-white-100 hover:bg-gray-100 rounded-b-md" onClick={handlePopoverToggle}><p className="pl-1 text-red-500">Delete</p></button></li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </Card>
    )

}