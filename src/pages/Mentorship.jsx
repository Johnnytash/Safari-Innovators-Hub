import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RequestSessionModal from '../components/RequestSessionModal';
import FAQAccordion from '../components/FAQAccordion';
import { Linkedin, Twitter, FileText, Star, ChevronDown, ChevronUp, Search } from 'lucide-react';

const mentors = [
  { 
    id: 1,
    name: "John Doe", 
    expertise: "Tech Startups", 
    availability: "Mon, Wed, Fri",
    linkedin: "https://www.linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    cv: "https://example.com/johndoe-cv.pdf",
    photo: "https://example.com/johndoe.jpg",
    background: "Former CTO of TechCorp, 15 years experience in scaling startups",
    achievements: "Led 3 successful exits, Angel investor in 10+ startups",
    rating: 4.8,
    reviews: [
      { text: "John's advice was invaluable for our seed round.", author: "Jane S." },
      { text: "Incredibly insightful mentor. Highly recommended!", author: "Mike R." }
    ]
  },
  { 
    id: 2,
    name: "Jane Smith", 
    expertise: "Social Entrepreneurship", 
    availability: "Tue, Thu",
    linkedin: "https://www.linkedin.com/in/janesmith",
    twitter: "https://twitter.com/janesmith",
    cv: "https://example.com/janesmith-cv.pdf",
    photo: "https://example.com/janesmith.jpg",
    background: "Founder of EcoSolutions, 10 years in sustainable business practices",
    achievements: "Forbes 30 Under 30, TEDx speaker on social impact",
    rating: 4.9,
    reviews: [
      { text: "Jane's guidance helped us pivot our business model for greater impact.", author: "Alex T." },
      { text: "An inspiring mentor with practical advice for social enterprises.", author: "Sam K." }
    ]
  },
  { 
    id: 3,
    name: "Mike Johnson", 
    expertise: "Financial Planning", 
    availability: "Wed, Fri",
    linkedin: "https://www.linkedin.com/in/mikejohnson",
    twitter: "https://twitter.com/mikejohnson",
    cv: "https://example.com/mikejohnson-cv.pdf",
    photo: "https://example.com/mikejohnson.jpg",
    background: "20+ years in investment banking and venture capital",
    achievements: "Managed $500M fund, advised 50+ startups on financial strategy",
    rating: 4.7,
    reviews: [
      { text: "Mike's financial insights were crucial for our Series A.", author: "Chris L." },
      { text: "Excellent mentor for financial modeling and fundraising.", author: "Sarah P." }
    ]
  },
];

const Mentorship = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMentor, setExpandedMentor] = useState(null);

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mentorship Program</h1>
      
      <p className="mb-6 text-lg">
        Connect with experienced industry leaders who can guide you through your entrepreneurial journey. 
        Our mentors provide valuable insights, feedback, and support to help you overcome challenges and achieve your goals.
      </p>

      <div className="mb-6 flex items-center">
        <Search className="mr-2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search mentors by name or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.photo} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{mentor.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Expertise: {mentor.expertise}</p>
              <p>Availability: {mentor.availability}</p>
              {mentor.rating && (
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(mentor.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="ml-2 text-sm">{mentor.rating.toFixed(1)}</span>
                </div>
              )}
              <div className="flex mt-4 space-x-4">
                {mentor.linkedin && (
                  <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <Linkedin size={24} />
                  </a>
                )}
                {mentor.twitter && (
                  <a href={mentor.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <Twitter size={24} />
                  </a>
                )}
                {mentor.cv && (
                  <a href={mentor.cv} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                    <FileText size={24} />
                  </a>
                )}
              </div>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center mt-4 text-sm text-blue-600 hover:text-blue-800">
                  {expandedMentor === mentor.id ? (
                    <>
                      <ChevronUp size={16} className="mr-1" />
                      Less Details
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} className="mr-1" />
                      More Details
                    </>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  {mentor.background && <p className="text-sm mb-2"><strong>Background:</strong> {mentor.background}</p>}
                  {mentor.achievements && <p className="text-sm mb-2"><strong>Achievements:</strong> {mentor.achievements}</p>}
                  {mentor.reviews && mentor.reviews.length > 0 && (
                    <div className="mt-2">
                      <strong className="text-sm">Reviews:</strong>
                      {mentor.reviews.map((review, index) => (
                        <p key={index} className="text-sm italic mt-1">"{review.text}" - {review.author}</p>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
              <Button className="mt-4 w-full" onClick={() => openModal(mentor)}>
                Request Session (60 min)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <FAQAccordion />

      <RequestSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={selectedMentor}
      />
    </div>
  );
};

export default Mentorship;
