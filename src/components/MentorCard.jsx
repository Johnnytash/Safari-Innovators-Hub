import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Linkedin, Twitter, FileText, Star, ChevronDown, ChevronUp } from 'lucide-react';

const MentorCard = ({ mentor, openModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
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
          <CollapsibleTrigger className="flex items-center mt-4 text-sm text-blue-600 hover:text-blue-800" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
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
  );
};

export default MentorCard;