import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ApplyFundingModal from '../components/ApplyFundingModal';
import FundingOpportunityCard from '../components/FundingOpportunityCard';
import { DollarSign, Users, Briefcase } from 'lucide-react';

const fundingOpportunities = [
  {
    title: "Seed Grant Program",
    amount: "1,000,000",
    type: "Grant",
    deadline: "2023-12-31",
    description: "Early-stage funding for innovative startups with high growth potential.",
    eligibility: "Tech startups less than 2 years old",
    icon: <DollarSign className="h-6 w-6" />,
    successStory: "TechInnovate secured this grant and grew 300% in 6 months!",
    contactInfo: "seedgrant@example.com",
    guidelines: "Applicants must submit a detailed business plan, financial projections, and demonstrate market validation. The grant focuses on scalable tech solutions with potential for significant social or economic impact."
  },
  {
    title: "Tech Startup Accelerator",
    amount: "5,000,000",
    type: "Investment",
    deadline: "2023-11-30",
    description: "Intensive program offering funding, mentorship, and resources for tech startups.",
    eligibility: "Tech startups with MVP and initial traction",
    icon: <Briefcase className="h-6 w-6" />,
    successStory: "DataPro participated and secured Series A funding within a year.",
    contactInfo: "accelerator@example.com",
    guidelines: "Selected startups will participate in a 3-month accelerator program. Must have a working MVP and be willing to relocate to Nairobi for the duration of the program. Equity stake of 5-10% will be taken in exchange for funding and support."
  },
  {
    title: "Social Impact Fund",
    amount: "2,500,000",
    type: "Grant",
    deadline: "2024-01-15",
    description: "Funding for startups addressing critical social or environmental challenges.",
    eligibility: "Startups with clear social impact metrics",
    icon: <Users className="h-6 w-6" />,
    successStory: "EcoSolutions expanded operations to 3 counties after receiving this grant.",
    contactInfo: "impact@example.com",
    guidelines: "Proposals should clearly outline the social or environmental problem being addressed, the proposed solution, and measurable impact metrics. Priority given to projects in education, healthcare, clean energy, and sustainable agriculture."
  },
];

const Funding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('deadline');

  const openModal = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const openGuidelines = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsGuidelinesOpen(true);
  };

  const filteredAndSortedOpportunities = fundingOpportunities
    .filter(opp => filter === 'all' || opp.type.toLowerCase() === filter)
    .sort((a, b) => {
      if (sort === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      if (sort === 'amount') return parseInt(b.amount) - parseInt(a.amount);
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Funding Opportunities</h1>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="grant">Grants</SelectItem>
            <SelectItem value="investment">Investments</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={setSort} defaultValue="deadline">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedOpportunities.map((opportunity, index) => (
          <FundingOpportunityCard
            key={index}
            opportunity={opportunity}
            openModal={openModal}
            openGuidelines={openGuidelines}
          />
        ))}
      </div>

      <ApplyFundingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunity={selectedOpportunity}
      />

      <Dialog open={isGuidelinesOpen} onOpenChange={setIsGuidelinesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedOpportunity?.title} Guidelines</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedOpportunity?.guidelines}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Funding;