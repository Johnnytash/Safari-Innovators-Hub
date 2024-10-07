import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Countdown from 'react-countdown';
import { Calendar, Info } from 'lucide-react';

const FundingOpportunityCard = ({ opportunity, openModal, openGuidelines }) => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-blue-50 flex flex-row items-center space-x-4">
      <div className="bg-blue-500 text-white p-3 rounded-full">
        {opportunity.icon}
      </div>
      <div>
        <CardTitle>{opportunity.title}</CardTitle>
        <Badge className="mt-2">{opportunity.type}</Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-6">
      <p className="text-sm mb-4">{opportunity.description}</p>
      <p className="font-semibold mb-2">Amount: KSh {opportunity.amount}</p>
      <p className="text-sm mb-2"><span className="font-semibold">Eligibility:</span> {opportunity.eligibility}</p>
      <div className="flex items-center text-orange-600 font-semibold mb-4">
        <Calendar className="h-4 w-4 mr-2" />
        <Countdown date={new Date(opportunity.deadline)} />
      </div>
      <p className="text-xs italic mb-4">"{opportunity.successStory}"</p>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => openModal(opportunity)} className="bg-blue-500 hover:bg-blue-600 transition-colors">
          Apply Now
        </Button>
        <Button variant="outline" size="sm" className="text-blue-500 border-blue-500" onClick={() => openGuidelines(opportunity)}>
          <Info className="h-4 w-4 mr-2" />
          Guidelines
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Questions? Contact: {opportunity.contactInfo}
      </p>
    </CardContent>
  </Card>
);

export default FundingOpportunityCard;