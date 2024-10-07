import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, DollarSign, Rocket, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const FeatureCard = ({ title, description, link, icon }) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link to={link} className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </CardContent>
  </Card>
);

const SuccessStory = ({ name, story }) => (
  <Card className="hover:shadow-md transition-all duration-300">
    <CardContent className="pt-6">
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600">{story}</p>
    </CardContent>
  </Card>
);

const EventCalendar = ({ events }) => {
  const [date, setDate] = React.useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleRegister = () => {
    // Here you would typically send a request to your backend to register the user
    // For now, we'll just show a success message
    toast.success(`You've been registered for ${selectedEvent.title}`);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="mt-4 space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center">
              <Badge variant="outline" className="mr-2">{new Date(event.date).toLocaleDateString()}</Badge>
              <button 
                className="text-sm text-blue-600 hover:underline"
                onClick={() => handleEventClick(event)}
              >
                {event.title}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <p>Date: {selectedEvent && new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p>Would you like to register for this event?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRegister}>Register</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Safari Innovators Hub</h1>
        <p className="mb-4">Please log in or sign up to access the full features of our platform.</p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const successStories = [
    { name: "Sarah M.", story: "Launched a successful eco-friendly packaging startup after completing the entrepreneurship course." },
    { name: "John D.", story: "Secured seed funding for his agritech solution through the platform's networking events." }
  ];

  const upcomingEvents = [
    { date: '2024-04-15', title: 'Startup Pitch Workshop' },
    { date: '2024-04-22', title: 'Tech Innovation Webinar' },
    { date: '2024-05-01', title: 'Networking Mixer' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Safari Innovators Hub</h1>
        <p className="text-lg sm:text-xl text-gray-600">Empowering young innovators to build successful businesses</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard 
          title="Learning Modules" 
          description="Access comprehensive entrepreneurship courses and workshops."
          link="/learning"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
        />
        <FeatureCard 
          title="Mentorship" 
          description="Connect with experienced mentors in your industry."
          link="/mentorship"
          icon={<Users className="h-6 w-6 text-green-500" />}
        />
        <FeatureCard 
          title="Funding Opportunities" 
          description="Discover grants, investments, and crowdfunding options."
          link="/funding"
          icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="mr-2 h-5 w-5" />
                Featured Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {successStories.map((story, index) => (
                <SuccessStory key={index} name={story.name} story={story.story} />
              ))}
            </CardContent>
          </Card>
        </div>
        <EventCalendar events={upcomingEvents} />
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link to="/projects">Explore Projects</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
