import React from 'react';

const FAQSection = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">How does the mentorship program work?</h3>
          <p>Our mentorship program connects you with experienced professionals for one-on-one guidance sessions. You can browse mentor profiles, request a session, and meet virtually to discuss your business challenges and goals.</p>
        </div>
        <div>
          <h3 className="font-semibold">What happens after I request a session?</h3>
          <p>Once you request a session, the mentor will receive a notification. If they accept, you'll be provided with a link to schedule a mutually convenient time for your 60-minute virtual meeting.</p>
        </div>
        <div>
          <h3 className="font-semibold">Is there a cost for mentorship sessions?</h3>
          <p>The first introductory session with a mentor is complimentary. Subsequent sessions may have a fee, which varies by mentor. Details will be provided before you commit to additional sessions.</p>
        </div>
        <div>
          <h3 className="font-semibold">How do I prepare for a mentorship session?</h3>
          <p>Come prepared with specific questions or topics you'd like to discuss. It's helpful to share a brief overview of your business and current challenges with your mentor in advance of the session.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;