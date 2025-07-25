import { Link } from "react-router";

const Course = ({ course }) => {
  const {_id, title,description,name,duration,registrationStart,registrationEnd} = course;
  return (
    <div className="border p-4 pt-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold text-[#96ac35] mb-2">{title}</h2>
      <p className="text-gray-700 mb-1">{description}</p>
      <p className="text-sm text-gray-500">
        <strong>Instructor:</strong> {name}
      </p>
      
      <p className="text-sm text-gray-500">
        <strong>Duration:</strong> {duration}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Registration:</strong> {registrationStart} to{" "}
        {registrationEnd}
      </p>

      <Link
        to={`/courses/${_id}`}
        className="btn w-34 mt-3 rounded-4xl bg-[#3b35ac] font-bold text-white"
      >
        Details
      </Link>
    </div>
  );
};

export default Course;
