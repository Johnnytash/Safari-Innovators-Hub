import React from 'react';
import EventsCalendar from '../components/EventsCalendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
  const upcomingEvents = [
    { date: '2024-04-15', title: 'Startup Pitch Workshop' },
    { date: '2024-04-22', title: 'Tech Innovation Webinar' },
    { date: '2024-05-01', title: 'Networking Mixer' },
    { date: '2024-05-10', title: 'Funding Strategies Seminar' },
    { date: '2024-05-20', title: 'AI in Business Conference' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EventsCalendar events={upcomingEvents} />
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <li key={index}>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;