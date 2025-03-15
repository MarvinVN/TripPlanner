import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { DateRange } from "react-day-picker";
import { Card, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconPlus } from '@tabler/icons-react';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface CreateTripCardProps {
  onTripCreated: () => void;
}

export function CreateTripCard({ onTripCreated }: CreateTripCardProps) {

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined) 
  const [open, setOpen] = React.useState(false)
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken()
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post('http://localhost:8000/api/trips',
          { 
            "title": title,
            "description": description,
            "start_date": startDate,
            "end_date": endDate
          },
          { headers });

        console.log(data)
        
        setTitle('');
        setDescription('');
        setStartDate(undefined);
        setEndDate(undefined);
        handleDateChange(undefined);
        setOpen(false);
        onTripCreated();
    } catch (error) {
        console.error(error);
    }
  }

  const handleDateChange = (date: DateRange | undefined) => {
    setStartDate(date?.from);
    setEndDate(date?.to)
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="w-xl">
        <DialogHeader>
          <DialogTitle>Create a Trip</DialogTitle>
          <DialogDescription>
            ooga booga ooga booga
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h1 className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Trip Title
            </h1>
            <Input
              id="trip_title"
              defaultValue="Name your trip"
              className="col-span-3 text-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <h1>
              Description <span className="text-sm text-muted-foreground">(optional)</span>
            </h1>
            <Input
              id="description"
              defaultValue="Description"
              className="col-span-3 text-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
            <div className="space-y-2">
              <p>Trip Duration <span className="text-sm text-muted-foreground">(optional)</span></p>
              <DatePickerWithRange 
                id="date_range"
                className="col-span-3"
                onDateChange={handleDateChange}
                />
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}type="submit">Create</Button>
        </DialogFooter>
    </DialogContent>
      </Dialog>
  )

}