import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Book, DollarSign, PieChart, Megaphone, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LearningModule from '../components/LearningModule';
import ModuleContent from '../components/ModuleContent';

const learningModules = [
  { 
    id: 1,
    title: "Fundamentals of Entrepreneurship", 
    description: "Learn the basics of starting and running a business.",
    icon: <Book className="h-6 w-6" />,
    preview: "This module covers the essential concepts every entrepreneur should know, including business planning, market research, and startup fundamentals.",
    content: "Entrepreneurship is the process of designing, launching, and running a new business. It often begins with a unique idea or innovation and involves taking on financial risks in the hope of profit. Key aspects include identifying opportunities, securing resources, and building a team. Successful entrepreneurs typically possess traits such as creativity, resilience, and strong leadership skills."
  },
  { 
    id: 2,
    title: "Business Model Development", 
    description: "Discover how to create and refine your business model.",
    icon: <PieChart className="h-6 w-6" />,
    preview: "Learn how to develop a sustainable business model, including value proposition, customer segments, revenue streams, and cost structures.",
    content: "A business model is a company's plan for making a profit. It identifies the products or services the business will sell, the target market, and the anticipated expenses. Key components include value proposition, customer segments, channels, customer relationships, revenue streams, key resources, key activities, key partnerships, and cost structure. The Business Model Canvas is a popular tool for visualizing and developing business models."
  },
  { 
    id: 3,
    title: "Financial Planning", 
    description: "Master the essentials of financial management for startups.",
    icon: <DollarSign className="h-6 w-6" />,
    preview: "Understand key financial concepts, budgeting, cash flow management, and how to create financial projections for your startup.",
    content: "Financial planning for startups involves forecasting future financial results and determining how to meet strategic goals. Key aspects include creating a budget, managing cash flow, understanding financial statements (income statement, balance sheet, cash flow statement), and making financial projections. It's crucial to consider both short-term operational needs and long-term strategic financial objectives."
  },
  { 
    id: 4,
    title: "Marketing Strategies", 
    description: "Explore effective marketing techniques for new businesses.",
    icon: <Megaphone className="h-6 w-6" />,
    preview: "Discover various marketing channels, learn how to create a marketing plan, and understand the basics of branding and customer acquisition.",
    content: "Marketing strategies for new businesses focus on introducing the company to the market and attracting initial customers. Key elements include defining your target audience, creating a unique value proposition, choosing appropriate marketing channels (e.g., social media, content marketing, paid advertising), and developing a strong brand identity. It's important to track marketing metrics to understand what's working and adjust strategies accordingly."
  },
];

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState(() => {
    // In a real app, this would be fetched from a backend
    return {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    };
  });
  const [activeModule, setActiveModule] = useState(null);

  const filteredModules = learningModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple recommendation system based on incomplete modules
  const recommendedModule = learningModules.find(module => userProgress[module.id] < 100) || learningModules[0];

  const handleStartLearning = (module) => {
    setActiveModule(module);
  };

  const handleCompleteModule = (moduleId) => {
    setUserProgress(prev => ({ ...prev, [moduleId]: 100 }));
    setActiveModule(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Learning Modules</h1>
      
      {!activeModule && (
        <>
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Recommended for you:</h2>
            <LearningModule 
              module={recommendedModule}
              progress={userProgress[recommendedModule.id]}
              onStartLearning={() => handleStartLearning(recommendedModule)}
            />
          </div>

          <div className="flex items-center mb-6">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <LearningModule 
                key={module.id}
                module={module}
                progress={userProgress[module.id]}
                onStartLearning={() => handleStartLearning(module)}
              />
            ))}
          </div>
        </>
      )}

      {activeModule && (
        <div>
          <Button onClick={() => setActiveModule(null)} className="mb-4">Back to Modules</Button>
          <ModuleContent 
            module={activeModule} 
            onComplete={() => handleCompleteModule(activeModule.id)}
          />
        </div>
      )}
    </div>
  );
};

export default Learning;