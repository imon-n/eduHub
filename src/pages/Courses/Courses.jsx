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
      const res = await axios.get("/courses?status=approved");
      const rawData = res.data;
      return rawData;
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
    <div>
      <h1 className="mt-10 mb-10 text-center font-bold text-3xl text-[#96ac35]">
        Featured Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {courses.map((course) => (
          <Course key={course._id || course.title} course={course} />
        ))}
      </div>

    </div>
  );
};

export default Courses;