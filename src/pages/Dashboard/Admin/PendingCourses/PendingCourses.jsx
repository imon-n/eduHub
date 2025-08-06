import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import PendingCourse from "./PendingCourse";

const PendingCourses = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: courses = [],
    isPending,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["courses", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses?status=pending");
      console.log(res.data);
      return res.data;
    },
  });

  if (isPending) {
    return <div className="text-center mt-10">Loading approved courses...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="px-6">
      <h1 className="text-center font-bold text-3xl text-[#96ac35] mt-10 mb-6">
        Pending Courses
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-[#96ac35] text-white text-lg">
            <tr>
              <th>Course Title</th>
              <th>Tutor Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <PendingCourse key={course._id} course={course} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingCourses;
