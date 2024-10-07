import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const resources = [
  {
    title: "Business Plan Templates",
    description: "Access a variety of business plan templates to help structure your startup idea.",
    content: "Our business plan templates include: Executive Summary Template, Financial Projections Spreadsheet, Market Analysis Worksheet, and SWOT Analysis Template. These resources will help you create a comprehensive and professional business plan.",
    link: "https://example.com/business-plan-templates"
  },
  {
    title: "Funding Guide",
    description: "Learn about different funding options available for startups and how to approach investors.",
    content: "This guide covers: Types of Startup Funding, How to Pitch to Investors, Understanding Term Sheets, and Equity vs. Debt Financing. It also includes a directory of local and international investors interested in African startups.",
    link: "https://example.com/funding-guide"
  },
  {
    title: "Legal Resources",
    description: "Find information on business registration, intellectual property, and contracts.",
    content: "Our legal resources include: Step-by-step Guide to Registering a Business in Kenya, Intellectual Property Protection Strategies, Common Legal Contracts for Startups (with templates), and an Overview of Business Regulations in East Africa.",
    link: "https://example.com/legal-resources"
  },
  {
    title: "Marketing Toolkit",
    description: "Get access to marketing strategies, tools, and templates for promoting your startup.",
    content: "Our marketing toolkit includes: Social Media Strategy Guide, Email Marketing Templates, SEO Best Practices, and Content Marketing Plan. These resources will help you effectively reach your target audience.",
    link: "https://example.com/marketing-toolkit"
  },
  {
    title: "Networking Events Calendar",
    description: "Stay updated on upcoming networking events, workshops, and conferences.",
    content: "Our calendar features: Monthly Networking Events, Workshops on Business Development, and Conferences focused on Innovation and Technology. Join us to connect with like-minded entrepreneurs.",
    link: "https://example.com/networking-events"
  },
  {
    title: "Mentor Directory",
    description: "Browse through our list of experienced mentors and their areas of expertise.",
    content: "Our mentor directory includes: Profiles of industry experts, Areas of expertise, and Contact information. Connect with a mentor to gain insights and guidance for your startup journey.",
    link: "https://example.com/mentor-directory"
  }
];

const ResourceCard = ({ resource, openDialog }) => (
  <Card>
    <CardHeader>
      <CardTitle>{resource.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4">{resource.description}</p>
      <Button onClick={() => openDialog(resource)}>Access Resource</Button>
    </CardContent>
  </Card>
);

const ResourceCenter = () => {
  const [selectedResource, setSelectedResource] = React.useState(null);

  const openDialog = (resource) => setSelectedResource(resource);
  const closeDialog = () => setSelectedResource(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resource Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} openDialog={openDialog} />
        ))}
      </div>

      <Dialog open={!!selectedResource} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedResource?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="mb-4">{selectedResource?.content}</p>
            <Button as="a" href={selectedResource?.link} target="_blank" rel="noopener noreferrer">
              Visit Resource
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceCenter;
