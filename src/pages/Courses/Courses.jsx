import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Course from "./Course";
import useAxios from "../../hooks/useAxios";

const Courses = () => {
  const axios = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses", "approved", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `/courses?status=approved&page=${currentPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalCourses = data?.total || 0;
  const totalPages = Math.ceil(totalCourses / limit);
  const courses = data?.courses || [];

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
    <div className="p-4">
      <h1 className="text-center font-bold text-3xl text-[#96ac35] mb-6">
        Featured Courses
      </h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`btn btn-sm ${
                currentPage === page + 1
                  ? "bg-[#96ac35] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
            
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
