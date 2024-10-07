import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ProjectCard = ({ project, onLearnMore, viewMode }) => {
  const fallbackImage = '/placeholder.svg';

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return fallbackImage;
    if (imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
      // If it's a blob URL or data URL, use it directly
      return imageUrl;
    }
    // For other URLs, assume they are relative paths to the public folder
    return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  };

  const cardContent = (
    <>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
        <CardDescription>{project.founder}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-2 text-sm sm:text-base">{project.description}</p>
        <div className="flex flex-wrap justify-between items-center mb-2">
          <Badge className="mb-1 sm:mb-0">{project.industry}</Badge>
          <Badge variant="outline">{project.stage}</Badge>
        </div>
        <p className="text-xs sm:text-sm text-gray-600">Funding Goal: KSh {project.fundingNeeded}</p>
        <div className="mt-2 mb-2">
          <Progress value={project.progress} className="w-full" />
          <p className="text-xs text-right mt-1">{project.progress}% Complete</p>
        </div>
        <p className="text-xs text-gray-500">Last Updated: {new Date(project.lastUpdated).toLocaleDateString()}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags && project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onLearnMore}>Learn More</Button>
      </CardFooter>
    </>
  );

  const imageElement = (
    <img 
      src={getImageSrc(project.image)}
      alt={project.title} 
      className={viewMode === 'list' ? "w-1/4 object-cover" : "w-full h-48 object-cover"}
      onError={handleImageError}
    />
  );

  if (viewMode === 'list') {
    return (
      <Card className="flex flex-row overflow-hidden">
        {imageElement}
        <div className="flex-grow flex flex-col">{cardContent}</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {imageElement}
      {cardContent}
    </Card>
  );
};

export default ProjectCard;