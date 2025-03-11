import Image from "next/image";

interface Trip {
    tripId: number;
    ownerId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export default function TripList({ trips }: { trips: Trip[] }) {
    return (
        <div className="space-y-4">
          {trips.map((trip, index) => (
            <div key={trip.tripId}>
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{trip.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{trip.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {formatDistanceToNow(new Date(trip.lastUpdated), { addSuffix: true })}
                  </p>
                </div>
              </div>
              {index < trips.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      )
}