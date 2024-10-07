import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from 'lucide-react';

const LearningModule = ({ module, progress, onStartLearning }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center">
            {module.icon}
            <span className="ml-2">{module.title}</span>
          </div>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{module.description}</p>
        {showPreview && (
          <div className="mt-2 mb-4 text-xs sm:text-sm bg-gray-100 p-2 rounded">
            <strong>Preview:</strong> {module.preview}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <Progress value={progress} className="w-2/3" />
          <span className="text-xs sm:text-sm font-medium">{progress}%</span>
        </div>
        <Button className="w-full mt-4" onClick={onStartLearning}>
          {progress === 0 ? 'Start Learning' : 'Continue Learning'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LearningModule;