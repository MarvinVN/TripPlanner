import { Trip } from "@/app/types";
import { Image } from "@heroui/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function TripCard({ trip }: { trip: Trip }) {

    return (
        <Card className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 bg-purple-300 items-center justify-center hover:shadow-lg">
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
            <CardHeader className="flex flex-col col-span-6 md:col-span-8 items-end justify-end">
                <div>
                    <CardTitle className="text-2xl">{trip.title}</CardTitle>
                    <CardDescription className="text-md">{trip.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
        </Card>
    )

}