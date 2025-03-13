import { Trip } from "@/app/types";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconPlus } from '@tabler/icons-react'

export function CreateTripCard() {

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Card className="place-content-end bg-gray-300 hover:bg-gray-400">
                <div className="flex justify-center">
                    <IconPlus size={70}/>
                </div>
                <div className="flex justify-center">
                    <CardTitle>Create a new trip</CardTitle>
                </div>
            </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Trip</DialogTitle>
          <DialogDescription>
            ooga booga ooga booga
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h1 className="text-right">
              Trip Title
            </h1>
            <Input
              id="trip_title"
              defaultValue="Name your trip"
              className="col-span-3 text-gray-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <h1 className="text-right">
              Description
            <p className="text-xs"> *optional </p>
            </h1>
            <Input
              id="description"
              defaultValue="Description"
              className="col-span-3 text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
        </Dialog>
    )

}