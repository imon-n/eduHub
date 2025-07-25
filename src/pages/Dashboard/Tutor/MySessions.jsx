import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["mySessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This session will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/courses/${id}`);
      refetch();
      Swal.fire("Deleted!", "Session deleted successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to delete session.", "error");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/updateSession/${id}`);
  };

  return (
    <div className="p-6 bg-[#f3fdf5] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#96ac35] mb-6 text-center">
        My Created Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any sessions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold text-[#444]">{session.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{session.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Duration: {session.duration}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleUpdate(session._id)}
                  className="btn btn-sm btn-info text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(session._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;
