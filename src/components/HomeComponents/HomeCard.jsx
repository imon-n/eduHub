import { Link } from "react-router";

const HomeCard = ({ course }) => {
  return (
    <div className="w-72 border-2 border-[#d2d3cd]  rounded-xl bg-[#f5f6ef] shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      
      <h2 className="text-2xl font-bold text-[#96ac35] mb-4">{course.title}</h2>

      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Instructor:</span> {course.name}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Duration:</span> {course.duration}
      </p>

      <Link
        to={`/courses/${course._id}`}
        className="block w-full text-center py-2 bg-[#96ac35] text-white font-bold rounded-full shadow hover:bg-green-700 transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default HomeCard;
