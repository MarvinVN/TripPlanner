import Image from "next/image";
import { Trip } from "../../types";

export default function TripList({ trips }: { trips: Trip[] }) {
    return (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.trip_id}>
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{trip.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{trip.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {new Date(trip.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
}