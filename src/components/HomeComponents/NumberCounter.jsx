import React, { useState, useEffect } from "react";

const NumberCounter = () => {
  const counters = [
    { title: "Courses Completed", end: 120 },
    { title: "Active Students", end: 3509 },
    { title: "Connected Company", end: 345 },
    { title: "Tutors Available", end: 45 },
  ];

  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
    const duration = 4000; // animation duration
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);

    const increments = counters.map(c => c.end / totalFrames);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      setCounts(prev =>
        prev.map((count, idx) => {
          const next = count + increments[idx];
          return next >= counters[idx].end ? counters[idx].end : next;
        })
      );

      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-4 gap-6">
      {counters.map((counter, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-[#eceee3] p-12  rounded-2xl shadow-xl border border-gray-200 max-w-sm mx-auto hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-[#96ac35] mb-4 font-sans text-xl font-semibold text-center">
            {counter.title}
          </h3>
          <div className="text-5xl font-bold text-[#96ac35] bg-gray-50 px-6 py-4 rounded-lg shadow-md my-2">
            {Math.ceil(counts[index]).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberCounter;
