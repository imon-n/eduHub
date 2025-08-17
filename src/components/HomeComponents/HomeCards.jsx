import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import HomeCard from "./HomeCard";
import useAxios from "../../hooks/useAxios";

const HomeCards = () => {
  const axiosSecure = useAxios();

  const {
    data: courses = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      const rawData = res.data;
      console.log(rawData); // undefined , why
      const sorted = rawData.sort(
        (a, b) => new Date(b.classStart) - new Date(a.classStart)
      );
      return sorted.slice(0, 6);
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
      <h1 className="mt-20 mb-10 text-center font-bold text-3xl text-[#96ac35]">
        Featured Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ml-10 gap-4 p-4">
        {courses.map((course) => (
          <HomeCard key={course._id || course.title} course={course} />
        ))}
      </div>

      <Link
        to="/courses"
        className="flex justify-center items-center mt-12 mb-10  gap-2"
      >
        <div className="btn w-44 rounded-4xl bg-[#96ac35] font-bold text-white">
          See All Courses
        </div>
      </Link>
    </div>
  );
};

export default HomeCards;
