import { useState } from 'react';
import { Trip } from "@/app/types";
import Image from "next/image";
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from "@tabler/icons-react";

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
                <DropdownMenu open={isPopoverOpen} onOpenChange={handlePopoverToggle}>
                    <DropdownMenuTrigger className="flex justify-end pr-2">
                        <div className="p-1 rounded-full bg-purple-300 hover:bg-purple-400">
                            <IconDotsVertical/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-20 w-50 bg-white shadow-lg rounded-md">
                        <div className="hover:bg-gray-100 rounded-t-md"><DropdownMenuItem onClick={handlePopoverToggle}>
                            <button className="block w-full text-left bg-white-100"><p className="text-black">Edit</p></button>
                        </DropdownMenuItem></div>
                        <div className="hover:bg-gray-100 rounded-none"><DropdownMenuItem onClick={handlePopoverToggle} className="hover:bg-gray-100 rounded-none">
                            <button className="block w-full text-left bg-white-100"><p className="text-black">Duplicate</p></button>
                        </DropdownMenuItem></div>
                        <div className="hover:bg-gray-100 rounded-none"><DropdownMenuItem onClick={handlePopoverToggle} className="hover:bg-gray-100 rounded-none">
                            <button className="block w-full text-left bg-white-100"><p className="text-black">Share</p></button>
                        </DropdownMenuItem></div>
                        <div className="hover:bg-gray-100 rounded-b-md"><DropdownMenuItem onClick={handlePopoverToggle} className="hover:bg-gray-100 rounded-b-md">
                            <button className="block w-full text-left bg-white-100"><p className="text-red-500">Delete</p></button>
                        </DropdownMenuItem></div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )

}