import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "How does the mentorship program work?",
      answer: "Our mentorship program connects you with experienced professionals for one-on-one guidance sessions. You can browse mentor profiles, request a session, and meet virtually to discuss your business challenges and goals."
    },
    {
      question: "What happens after I request a session?",
      answer: "Once you request a session, the mentor will receive a notification. If they accept, you'll be provided with a link to schedule a mutually convenient time for your 60-minute virtual meeting."
    },
    {
      question: "Is there a cost for mentorship sessions?",
      answer: "The first introductory session with a mentor is complimentary. Subsequent sessions may have a fee, which varies by mentor. Details will be provided before you commit to additional sessions."
    },
    {
      question: "How do I prepare for a mentorship session?",
      answer: "Come prepared with specific questions or topics you'd like to discuss. It's helpful to share a brief overview of your business and current challenges with your mentor in advance of the session."
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;