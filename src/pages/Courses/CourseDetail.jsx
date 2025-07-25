import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useUserRole from "../../hooks/useUserRole";

const CourseDetail = () => {
  const { role } = useUserRole(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: course,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${id}`);
      return res.data;
    },
  });

  const isBookingDisabled = !user || role === "admin" || role === "tutor";

  const handlePay = () => {
    if (isBookingDisabled) return;

    if (course.registrationFee === 0) {
      const newPayment = {
        courseId: course._id,
        courseTitle: course.title,
        email: user?.email,
        amount: 0,
        paidAt: new Date().toISOString().split("T")[0],
      };

      axiosSecure
        .post("/payments", newPayment)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Successfully Booked for Free!", "", "success");
            navigate("/dashboard/bookedSession");
          }
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            Swal.fire("Already Booked!", "", "error");
          } else {
            Swal.fire("Something went wrong!", "", "error");
          }
        });
    } else {
      navigate(`/dashboard/payment/${id}`);
    }
  };

  if (isPending) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner text-primary"></span>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold text-violet-700 mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.name}</p>
      <p className="text-gray-700 mb-2"><strong>Email:</strong> {course.email}</p>
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {course.description}</p>
      <p className="text-gray-700 mb-2"><strong>Class Schedule:</strong> {course.classStart} → {course.classEnd}</p>
      <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-gray-700 mb-2"><strong>Registration Period:</strong> {course.registrationStart} → {course.registrationEnd}</p>

      <div className="mt-4">
        <button
          onClick={handlePay}
          disabled={isBookingDisabled}
          className={`btn w-40 rounded-full text-white font-bold ${
            course.registrationFee === 0
              ? "bg-[#96ac35]"
              : "bg-[#35ac4b]"
          } ${isBookingDisabled ? "opacity-100 cursor-not-allowed" : ""}`}
        >
          {course.registrationFee === 0
            ? "Free Booking"
            : `Pay ${course.registrationFee} BDT`}
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
