import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const challenges = [
  { title: "Eco-Innovation Challenge", description: "Develop sustainable solutions for urban living.", prize: "$5,000", deadline: "2023-12-15" },
  { title: "FinTech Hackathon", description: "Create innovative financial technology applications.", prize: "$10,000", deadline: "2023-11-30" },
  { title: "Social Impact Pitch Contest", description: "Present your ideas for solving social issues.", prize: "$7,500", deadline: "2024-01-10" },
];

const Challenges = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const openModal = (challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Entrepreneurial Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{challenge.description}</p>
              <p className="mt-2">Prize: {challenge.prize}</p>
              <p>Deadline: {challenge.deadline}</p>
              <Button className="mt-4" onClick={() => openModal(challenge)}>Enter Challenge</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter {selectedChallenge?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Proposal" required />
              <Input placeholder="Team Members (if any)" />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Submit Entry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Challenges;