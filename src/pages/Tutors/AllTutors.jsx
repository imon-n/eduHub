import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTutors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tutors = [], isLoading, isError, error } = useQuery({
    queryKey: ["allTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-6">Loading tutors...</div>;
  if (isError) return <div className="text-center mt-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 min-h-screen bg-[rgb(243,246,241)]">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#96ac35]">All Tutors</h2>

      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-[#d5e4d5] shadow-lg p-6 rounded-xl border border-[#96ac35]/20 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg font-semibold text-[#96ac35]">{tutor.name || "Unnamed Tutor"}</h3>
              <p className="text-sm text-gray-700 mt-1">{tutor.email}</p>
              <button
                className="btn btn-outline btn-success btn-sm mt-4"
                onClick={() => console.log("Details for:", tutor._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTutors;
