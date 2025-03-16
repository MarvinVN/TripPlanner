import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { IconMenu2 } from '@tabler/icons-react';

export default function PageHeader() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }

    return (
        <header className="flex justify-between items-center py-4 px-6 border-b border-gray-300">
            <div>
                <img src="" alt="Logo Here" className="h-10"/>
            </div>
            <div>
                <Popover open={isPopoverOpen} onOpenChange={handlePopoverToggle}>
                    <PopoverTrigger asChild>
                        <Button className="flex justify-around w-23 bg-white border-2 rounded-full px-8 py-5 cursor-pointer">
                            <IconMenu2 className="text-gray-500"/>
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback className="bg-gray-400">A</AvatarFallback>
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 pl-2 mr-10 w-50 bg-white shadow-lg rounded-md">
                        <ul className="list-none p-0 m-0">
                            <li><button className="block w-full text-left font-medium p-2 bg-white-100 hover:bg-gray-100 rounded-t-md" onClick={handlePopoverToggle}><p className="text-black">User Trips</p></button></li>
                            <li><button className="block w-full text-left font-medium  p-2 bg-white-100 hover:bg-gray-100 rounded-none" onClick={handlePopoverToggle}><p className="text-black">Account Settings</p></button></li>
                            <li><button className="block w-full text-left font-medium p-2 bg-white-100 hover:bg-gray-100 rounded-b-md" onClick={handlePopoverToggle}><p className="text-black">Log Out</p></button></li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    )
}