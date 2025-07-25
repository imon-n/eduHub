import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/notes", data);
      Swal.fire("Success", "Note created successfully!", "success");
      reset();
    } catch (error) {
      Swal.fire("Error", "Failed to create note", {error});
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#96ac35]">Create a New Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label>Email</label>
          <input
            readOnly
            defaultValue={user?.email}
            {...register("email")}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Title</label>
          <input {...register("title", { required: true })} className="input input-bordered w-full" />
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-success text-white">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
