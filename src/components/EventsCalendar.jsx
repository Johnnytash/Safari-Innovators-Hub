import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const EventsCalendar = ({ events }) => {
  const [date, setDate] = useState(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="mt-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center mt-2">
              <Badge variant="outline" className="mr-2">{new Date(event.date).toLocaleDateString()}</Badge>
              <span>{event.title}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;