import { useState } from "react";
import { FaCheck, FaEye, FaTimes, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PendingCourse = ({ course, refetch }) => {
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
    registrationFee = 0,
    email,
    tutorMessage, // NEW
  } = course;

  const axiosSecure = useAxiosSecure();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [feeType, setFeeType] = useState(registrationFee > 0 ? "paid" : "free");
  const [fee, setFee] = useState(registrationFee);

  const [rejectionReason, setRejectionReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleView = () => setIsDetailsModalOpen(true);
  const handleApproveClick = () => setIsApproveModalOpen(true);
  const handleRejectClick = () => setIsRejectModalOpen(true);

  const handleCloseModals = () => {
    setIsDetailsModalOpen(false);
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
    setFee(registrationFee);
    setFeeType(registrationFee > 0 ? "paid" : "free");
    setRejectionReason("");
    setFeedback("");
  };

  const handleApproveSubmit = async () => {
    console.log("handle status")
    const finalFee = feeType === "free" ? 0 : Number(fee);
    try {
      const res = await axiosSecure.patch(`/courses/${_id}/status`, {
        status: "approved",
        registrationFee: finalFee,
      });

      console.log(res.data);
      refetch();

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Course approved!", "success");
        handleCloseModals();
        refetch();
      } else {
        Swal.fire("Warning", "No changes made", "warning");
      }
    } catch (error) {
      console.error("Approval failed:", error);
      Swal.fire("Error", "Failed to approve course", "error");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      return Swal.fire("Validation Error", "Rejection reason is required", "warning");
    }
    const rejectedData = {
      _id,
      title,
      description,
      classStart,
      classEnd,
      name,
      duration,
      registrationStart,
      registrationEnd,
      status: "rejected",
      registrationFee,
      rejectedAt: new Date(),
      email,
      rejectionReason,
      feedback,
    };

    try {
      const res = await axiosSecure.post("/rejected", rejectedData);

      if (res.data.insertedId) {
        console.data(res.data)
        Swal.fire("Rejected!", "Course moved to rejected list.", "success");
        handleCloseModals();
        refetch();
      } else {
        Swal.fire("Error", "Failed to reject properly.", "error");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      Swal.fire("Error", "Failed to reject course", "error");
    }
  };

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{name}</td>
        <td className="flex justify-center gap-4">
          <button onClick={handleView} className="btn btn-sm btn-outline btn-info">
            <FaEye />
          </button>
          <button onClick={handleApproveClick} className="btn btn-sm btn-outline btn-accent">
            <FaCheck />
          </button>
          {/* <button onClick={handleRejectClick} className="btn btn-sm btn-outline btn-error">
            <FaTimesCircle />
          </button> */}
        </td>
      </tr>

      {/* Course Details Modal */}
      {isDetailsModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button onClick={handleCloseModals} className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-600">
              <FaTimes />
            </button>
            <h3 className="font-bold text-2xl mb-4 text-[#3498db]">Course Details</h3>
            <div className="space-y-2 text-left">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Description:</strong> {description}</p>
              <p><strong>Instructor:</strong> {name}</p>
              <p><strong>Class Schedule:</strong> {classStart} → {classEnd}</p>
              <p><strong>Duration:</strong> {duration}</p>
              <p><strong>Registration Period:</strong> {registrationStart} → {registrationEnd}</p>
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Registration Fee:</strong> {registrationFee} BDT</p>
              {tutorMessage && (
                <div className="bg-yellow-50 border border-yellow-300 rounded p-3 mt-3">
                  <p className="font-semibold text-yellow-700">Re-request Message from Tutor:</p>
                  <p className="text-sm text-yellow-800 whitespace-pre-wrap mt-1">{tutorMessage}</p>
                </div>
              )}
            </div>
            <div className="modal-action mt-4">
              <button onClick={handleCloseModals} className="btn btn-error text-white">Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button onClick={handleCloseModals} className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-600">
              <FaTimes />
            </button>
            <h3 className="font-bold text-2xl mb-4 text-[#96ac35]">Approve Course</h3>
            <div className="space-y-2 text-left">
              <p className="mb-4">Please confirm the course registration fee before approval.</p>
              <div>
                <span className="font-semibold block mb-1">Free or Paid?</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="feeType" value="free" checked={feeType === "free"} onChange={() => { setFeeType("free"); setFee(0); }} />
                    Free
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="feeType" value="paid" checked={feeType === "paid"} onChange={() => setFeeType("paid")} />
                    Paid
                  </label>
                </div>
              </div>
              {feeType === "paid" && (
                <label className="block mt-2">
                  <span className="font-semibold">Specify Amount (BDT):</span>
                  <input
                    type="number"
                    className="input input-bordered w-full mt-1"
                    value={fee}
                    min={0}
                    onChange={(e) => setFee(e.target.value)}
                  />
                </label>
              )}
            </div>
            <div className="modal-action mt-4 flex justify-between">
              <button onClick={handleApproveSubmit} className="btn btn-success text-white">Approve</button>
              <button onClick={handleCloseModals} className="btn btn-error text-white">Cancel</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button onClick={handleCloseModals} className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-600">
              <FaTimes />
            </button>
            <h3 className="font-bold text-2xl mb-4 text-red-600">Reject Course</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Rejection Reason <span className="text-red-500">*</span></label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Why is this course being rejected?"
                  required
                ></textarea>
              </div>
              <div>
                <label className="font-semibold">Feedback (Optional)</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={2}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback to the tutor"
                ></textarea>
              </div>
            </div>
            <div className="modal-action mt-4 flex justify-between">
              <button type="button" onClick={handleRejectSubmit} className="btn btn-error text-white">Confirm Reject</button>
              <button onClick={handleCloseModals} className="btn btn-ghost">Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default PendingCourse;
