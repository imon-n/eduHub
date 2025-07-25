import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const CreateCourse = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const courseData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      registrationFee: 0, // default
      status: "pending", // default
    };

    try {
      const res = await axiosSecure.post("/courses", courseData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Session created successfully.", "success");
        reset();
      }
    } catch (error) {
      console.error("Create course failed:", error);
      Swal.fire("Error", "Failed to create session", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Create New Study Session
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
          {errors.description && <p className="text-red-500">Description is required</p>}
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

        <div>
          <label className="font-semibold">Session Duration</label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 6 weeks"
          />
        </div>

        <div>
          <label className="font-semibold">Tutor Name</label>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Tutor Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <button type="submit" className="btn bg-[#96ac35] text-white w-full">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
