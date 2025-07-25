import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyNotes = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/notes/${id}`);
      refetch();
      Swal.fire("Deleted!", "Note has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete note", error);
    }
  };

  const handleUpdate = async (note) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Note",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title" value="${note.title}" />
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${note.description}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const description = document.getElementById("swal-description").value;
        if (!title || !description) {
          Swal.showValidationMessage("Title and description are required");
          return;
        }
        return { title, description };
      },
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!formValues) return;

    try {
      await axiosSecure.patch(`/notes/${note._id}`, {
        title: formValues.title,
        description: formValues.description,
      });
      refetch();
      Swal.fire("Success", "Note updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update note", error);
    }
  };

  return (
    <div className="p-6 bg-[#f3fdf5] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#96ac35] mb-6 text-center">Manage Your Notes</h2>
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {notes.map((note) => (
            <div key={note._id} className="bg-white border rounded-lg p-4 shadow">
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{note.description}</p>
              <div className="mt-4 flex gap-2">
                <buttonsswwewewd
                  onClick={() => handleUpdate(note)}
                  className="btn btn-sm btn-info text-white"
                >
                  Update
                </buttonsswwewewd>
                <button
                  onClick={() => handleDelete(note._id)}
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

export default MyNotes;
