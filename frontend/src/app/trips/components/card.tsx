import { Trip } from "@/app/types";
import { Card, Image } from "@heroui/react";

export function TripCard({ trip }: { trip: Trip }) {

    return (
        <Card isPressable onPress={() => console.log('Pressed: ' + trip.trip_id)}>
            <div className = "grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 bg-purple-500 items-center justify-center">
                <div className = "relative col-span-6 md:col-span-4">
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        height={125}
                        shadow="md"
                        src="https://heroui.com/images/album-cover.png"
                        width="100%"
                    />
                </div>
                <div className="flex flex-col col-span-6 md:col-span-8 items-end justify-center">
                    <div className="flex flex-col col-span-6 md:col-span-8 items-start justify-center p-4">
                        <h1 className="text-2xl font-bold text-gray-200">{trip.title}</h1>
                        <p className="text-gray-300">{trip.description}</p>
                        <p className="text-sm text-gray-300">{trip.start_date} - {trip.end_date}</p>
                    </div>
                </div>
            </div>
        </Card>
    )

}