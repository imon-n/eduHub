import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Rejected = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [requestText, setRequestText] = useState("");
  const [localCourses, setLocalCourses] = useState([]); // for instant UI update

  const {
    data: rejectedCourses = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["rejectedCourses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rejected?email=${user.email}`);
      setLocalCourses(res.data); // populate local list
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) {
    console.error(error);
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load rejected courses.
      </p>
    );
  }

  // ✅ Re-request course
  const handleAgainRequest = async () => {
    if (!selectedCourse) return;

    const {
      title,
      name,
      email,
      description,
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration,
      registrationFee = 0,
    } = selectedCourse;

    const courseData = {
      title,
      name,
      email,
      description,
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration,
      registrationFee,
      status: "pending",
      tutorMessage: requestText,
      requestedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/courses", courseData);
      console.log("Response from POST /courses:", res.data); // Add this
      console.log(res.data.insertedId);
       Swal.fire(
          "✅ Re-Requested",
          "Course re-submitted successfully!",
          "success"
        );

      await axiosSecure.delete(`/rejected/${selectedCourse._id}`);

        const updated = localCourses.filter(
          (c) => c._id !== selectedCourse._id
        );
        setLocalCourses(updated);

        Swal.fire(
          "✅ Re-Requested",
          "Course re-submitted successfully!",
          "success"
        );

        setSelectedCourse(null);
        setRequestText("");
        refetch();

    } catch (err) {
      console.error("Request error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#e74c3c]">
        My Rejected Courses
      </h2>

      {localCourses.length === 0 ? (
        <p>No rejected courses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Class Time</th>
                <th>Registration</th>
                <th>Fee</th>
                <th>Rejected At</th>
                <th>Reason</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {localCourses.map((course, index) => (
                <tr key={course._id} className="hover:bg-gray-50 align-top">
                  <td>{index + 1}</td>
                  <td>{course.title}</td>
                  <td>{course.duration}</td>
                  <td>
                    {course.classStart} → {course.classEnd}
                  </td>
                  <td>
                    {course.registrationStart} → {course.registrationEnd}
                  </td>
                  <td>{course.registrationFee || 0}</td>
                  <td>{new Date(course.rejectedAt).toLocaleDateString()}</td>
                  <td className="text-sm text-red-700 max-w-xs whitespace-pre-wrap">
                    {course.rejectionReason || "N/A"}
                  </td>
                  <td className="text-sm text-gray-600 max-w-xs whitespace-pre-wrap">
                    {course.feedback || "No feedback"}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="btn btn-sm btn-info text-white"
                    >
                      Again Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedCourse && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3 text-[#96ac35]">
              Re-request Session Approval
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              Please explain why you're submitting this course again:
            </p>
            <textarea
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter your message"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
            ></textarea>

            <div className="modal-action mt-4 flex justify-between">
              <button
                onClick={handleAgainRequest}
                className="btn btn-success text-white"
              >
                Submit Request
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setRequestText("");
                }}
                className="btn btn-error text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Rejected;
