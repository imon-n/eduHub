import { useState } from "react";
import { FaEye, FaTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ApprovedCourse = ({ course, refetch }) => {
  const {
    _id,
    title,
    description,
    classStart,
    classEnd,
    name,
    duration,
    registrationStart,
    registrationEnd,
    status,
    registrationFee,
  } = course;

  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fee, setFee] = useState(registrationFee);

  const handleView = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleFeeUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/course/${_id}/fee`, {
        registrationFee: fee,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Registration fee updated", "success");
        setIsModalOpen(false);
        refetch();
      } else {
        Swal.fire("Error", "No changes made", "warning");
      }
    } catch (error) {
      console.error("Fee update failed:", error);
      Swal.fire("Error", "Failed to update registration fee", "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/courses/${_id}`);
      if (res.data.deletedId) {
        Swal.fire("Deleted!", "Course has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete course.", "error");
    }
  };

  const handleStatus = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure you want to mark this course as pending?",
      text: "This action will change the course status to 'pending'.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as pending",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/course/${_id}/status`, {
        status: "pending",
      });

      if (refetch) refetch();

      Swal.fire(
        "Updated!",
        "The course has been marked as pending.",
        "success"
      );
    } catch (error) {
      console.error("Status update failed:", error);
      Swal.fire("Error", "Failed to mark course as pending.", "error");
    }
  };

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{name}</td>
        <td className="flex justify-center gap-4">
          <button
            onClick={handleView}
            className="btn btn-sm btn-outline btn-info"
          >
            <FaEye />
          </button>
          <button
            onClick={handleStatus}
            className="btn btn-sm btn-outline btn-ghost"
          >
            <FaTimes />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline btn-error"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <h3 className="font-bold text-2xl mb-4 text-[#96ac35]">{title}</h3>
            <div className="space-y-2 text-left">
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Instructor:</strong> {name}
              </p>
              <p>
                <strong>Class Schedule:</strong> {classStart} → {classEnd}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>
              <p>
                <strong>Registration:</strong> {registrationStart} →{" "}
                {registrationEnd}
              </p>
              <p>
                <strong>Status:</strong> {status}
              </p>
              <label className="block mt-4">
                <span className="font-semibold">
                  Update Registration Fee (BDT):
                </span>
                <input
                  type="number"
                  className="input input-bordered w-full mt-1"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  min={0}
                />
              </label>
            </div>

            {/* Optional Close Button Below */}
            <div className="modal-action mt-4">
              <button
                onClick={handleFeeUpdate}
                className="btn btn-success text-white"
              >
                Update Fee
              </button>
              <button
                onClick={handleClose}
                className="btn btn-error text-white"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ApprovedCourse;
