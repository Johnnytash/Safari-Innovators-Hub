import React from 'react';
import { Button } from "@/components/ui/button";

const ModuleContent = ({ module, onComplete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">{module.title}</h2>
      <div className="prose max-w-none">
        <p>{module.content}</p>
      </div>
      <Button className="mt-4" onClick={onComplete}>Mark as Complete</Button>
    </div>
  );
};

export default ModuleContent;