import React from 'react';

const RandomQuestion = () => {
  return (
    <div className="w-4/5 mx-auto p-10 space-y-2">
      <h1 className="text-center font-bold text-3xl pb-4">Frequently Asked Questions</h1>

      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-gray-200 border-blue-600 border"
      >
        <div className="collapse-title font-semibold">
          1. How do I book a study session on StudyHub?
        </div>
        <div className="collapse-content text-sm bg-base-100 pt-2">
          To book a session, visit the "Study Sessions" page, choose a session marked as "Ongoing", click "Read More", and then click the "Book Now" button. You must be logged in as a student to book a session.
        </div>
      </div>

      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-gray-200 border-blue-600 border"
      >
        <div className="collapse-title font-semibold">
          2. Can I book a session if the registration period has ended?
        </div>
        <div className="collapse-content text-sm bg-base-100 pt-2">
          No, sessions can only be booked during their registration period. Once the end date has passed, the session will be marked as "Closed" and the "Book Now" button will be disabled.
        </div>
      </div>

      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-gray-200 border-blue-600 border"
      >
        <div className="collapse-title font-semibold">
          3. How can I access study materials shared by tutors?
        </div>
        <div className="collapse-content text-sm bg-base-100 pt-2">
          After booking a session, go to your student dashboard and select "Study Materials". You'll be able to view and download materials (images or Google Drive links) shared by the tutor for that specific session.
        </div>
      </div>

      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-gray-200 border-blue-600 border"
      >
        <div className="collapse-title font-semibold">
          4. Can I create personal notes for my sessions?
        </div>
        <div className="collapse-content text-sm bg-base-100 pt-2">
          Yes, students can go to the "Create Note" section in their dashboard to add personal notes for any session. These notes can be edited or deleted anytime from the "Manage Notes" page.
        </div>
      </div>
    </div>
  );
};

export default RandomQuestion;
