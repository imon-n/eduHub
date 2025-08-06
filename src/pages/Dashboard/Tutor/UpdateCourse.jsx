import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await axiosSecure.get(`/courses/${id}`);
        reset(res.data); // set default values
      } catch (error) {
        console.error("Error loading course:", error);
        Swal.fire("Error", "Failed to load session data.", "error");
      }
    };
    loadCourse();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    const { _id, ...updateData } = data;

    try {
      const res = await axiosSecure.patch(`/courses/${id}`, updateData);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Session updated successfully.", "success");
        navigate("/dashboard/mySessions");
      } else {
        Swal.fire("No Change", "No fields were updated.", "info");
      }
      
    } catch (error) {
      console.error("Update course failed:", error);
      Swal.fire("Error", "Failed to update session", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Update Study Session
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Session Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div>
          <label className="font-semibold">Session Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Session Duration</label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 6 weeks"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Registration Start Date</label>
            <input
              type="date"
              {...register("registrationStart", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Registration End Date</label>
            <input
              type="date"
              {...register("registrationEnd", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Class Start Date</label>
            <input
              type="date"
              {...register("classStart", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Class End Date</label>
            <input
              type="date"
              {...register("classEnd", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn bg-[#96ac35] text-white w-full">
          Update Session
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
