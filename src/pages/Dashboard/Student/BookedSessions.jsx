import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SessionMaterialsModal from "./SessionMaterialsModal";

const BookedSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sessionDetails, setSessionDetails] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Get session details from /courses for each paid session
  useEffect(() => {
    const fetchSessions = async () => {
      if (payments.length === 0) return;

      try {
        const sessionIds = payments.map(p => p.courseId);
        const res = await axiosSecure.get("/courses"); // Get all courses
        const allCourses = res.data;

        // Filter only paid/booked sessions
        const filtered = allCourses.filter(course =>
          sessionIds.includes(course._id)
        );
        setSessionDetails(filtered);
      } catch (err) {
        console.error("Failed to load session details:", err);
      }
    };

    fetchSessions();
  }, [payments, axiosSecure]);

  if (isPending) {
    return <div className="text-center mt-10 font-semibold">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessionDetails.length > 0 ? (
          sessionDetails.map((session, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {session.title}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Duration:</span>{" "}
                  {session.duration}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Class Time:</span>{" "}
                  {session.classStart} → {session.classEnd}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Registration Fee:</span> $
                  {session.registrationFee}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setSelectedSessionId(session._id)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  Access Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500 py-6">
            No booked session details found.
          </div>
        )}
      </div>

      {/* ✅ Materials Modal */}
      {selectedSessionId && (
        <SessionMaterialsModal
          sessionId={selectedSessionId}
          onClose={() => setSelectedSessionId(null)}
        />
      )}
    </div>
  );
};

export default BookedSessions;
