import { useQuery } from "@tanstack/react-query";
import Course from "./Course";
import useAxios from "../../hooks/useAxios";

const Courses = () => {
  const axios = useAxios();

  const {
    data: courses = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses", "approved"],
    queryFn: async () => {
      const res = await axios.get("/courses?status=approved&paginate=false");
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <span className="ml-2 text-blue-600">Loading courses...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-4">
        Error loading courses: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl text-[#96ac35] mb-6">
        All Approved Courses
      </h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No approved courses found.</div>
      )}
    </div>
  );
};

export default Courses;
