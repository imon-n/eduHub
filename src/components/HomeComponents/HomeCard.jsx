const HomeCard = ({ course }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold text-[#96ac35] mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-1">{course.description}</p>
      <p className="text-sm text-gray-500">
        <strong>Instructor:</strong> {course.name}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Class:</strong> {course.classStart} to {course.classEnd}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Duration:</strong> {course.duration}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Registration:</strong> {course.registrationStart} to{" "}
        {course.registrationEnd}
      </p>
      {/* <p className="text-sm font-semibold mt-2 text-green-600">
        {course.registrationFee === 0
          ? "Free Registration"
          : `Fee: ${course.registrationFee} BDT`}
      </p> */}
      <div className="btn w-44 rounded-4xl bg-[#96ac35] font-bold text-white">
        Book Now
      </div>
    </div>
  );
};

export default HomeCard;
