import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell } from 'lucide-react';

const ApplyFundingModal = ({ isOpen, onClose, opportunity }) => {
  const [notifyMe, setNotifyMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (notifyMe) {
      // Logic to set up notifications
      console.log("Notification set for", opportunity.title);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {opportunity?.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input placeholder="Project Name" required />
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Project Description" required />
            <Input placeholder="Funding Amount Requested" type="number" required />
            <div className="flex items-center space-x-2">
              <Checkbox id="notify" checked={notifyMe} onCheckedChange={setNotifyMe} />
              <label htmlFor="notify" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Notify me about deadline
              </label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" className="w-full">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyFundingModal;