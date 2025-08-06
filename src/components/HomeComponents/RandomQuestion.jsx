import React from 'react';

const RandomQuestion = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-4">
      <h1 className="text-center font-semibold text-xl md:text-2xl text-[#1d3557] pb-6">
        Frequently Asked Questions
      </h1>

      {faqData.map((faq, index) => (
        <div
          key={index}
          tabIndex={0}
          className="collapse collapse-arrow bg-gray-100 border-l-4 border-[#457b9d] rounded-md"
        >
          <div className="collapse-title font-semibold text-base md:text-lg">
            {index + 1}. {faq.question}
          </div>
          <div className="collapse-content text-sm text-gray-700 bg-white px-2 py-1 rounded-b-md">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

const faqData = [
  {
    question: "How do I book a study session on StudyHub?",
    answer:
      'To book a session, visit the "Study Sessions" page, choose a session marked as "Ongoing", click "Read More", and then click the "Book Now" button. You must be logged in as a student to book a session.',
  },
  {
    question: "Can I book a session if the registration period has ended?",
    answer:
      'No, sessions can only be booked during their registration period. Once the end date has passed, the session will be marked as "Closed" and the "Book Now" button will be disabled.',
  },
  {
    question: "How can I access study materials shared by tutors?",
    answer:
      'After booking a session, go to your student dashboard and select "Study Materials". You\'ll be able to view and download materials (images or Google Drive links) shared by the tutor for that specific session.',
  },
  {
    question: "Can I create personal notes for my sessions?",
    answer:
      'Yes, students can go to the "Create Note" section in their dashboard to add personal notes for any session. These notes can be edited or deleted anytime from the "Manage Notes" page.',
  },
];

export default RandomQuestion;
