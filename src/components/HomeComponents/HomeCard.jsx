import { Link } from "react-router";

const HomeCard = ({ course }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold text-[#96ac35] mb-2">{course.title}</h2>
      <p className="text-sm text-gray-500">
        <strong>Instructor:</strong> {course.name}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Duration:</strong> {course.duration}
      </p>
      <Link
        to={`/courses/${course._id}`}
        className="btn w-34 mt-3 rounded-4xl bg-[#96ac35] font-bold text-white"
      >
        Details
      </Link>
    </div>
  );
};

export default HomeCard;
