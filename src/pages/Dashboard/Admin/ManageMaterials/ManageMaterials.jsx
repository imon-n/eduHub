import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  // Fetch materials (TanStack v5 syntax)
  const {
    data: materials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  // Mutation: update material
  const updateMutation = useMutation({
    mutationFn: ({ id, title }) =>
      axiosSecure.patch(`/materials/${id}`, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setEditingId(null);
      setEditedTitle("");
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Material updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update material.",
      });
    },
  });

  // Mutation: delete material
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/materials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Material deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete material.",
      });
    },
  });

  // UI actions
  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
  };

  const saveEdit = (id) => {
    if (!editedTitle.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Title cannot be empty.",
      });
      return;
    }
    updateMutation.mutate({ id, title: editedTitle });
  };

  const deleteMaterial = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="p-4">Loading materials...</p>;
  if (isError)
    return <p className="p-4 text-red-600">Failed to load materials.</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Manage Study Materials</h2>
      <table className="table table-zebra w-full min-w-[600px]">
        <thead>
          <tr>
            <th>Title</th>
            <th>Tutor Email</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No materials found.
              </td>
            </tr>
          )}
          {materials.map(({ _id, title, tutorEmail, link }) => (
            <tr key={_id}>
              <td>
                {editingId === _id ? (
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full max-w-xs"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  title
                )}
              </td>
              <td>{tutorEmail}</td>
              <td>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {editingId === _id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success mr-2"
                      onClick={() => saveEdit(_id)}
                      disabled={updateMutation.isLoading}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={cancelEdit}
                      disabled={updateMutation.isLoading}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => startEdit(_id, title)}
                      disabled={
                        updateMutation.isLoading || deleteMutation.isLoading
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteMaterial(_id)}
                      disabled={
                        updateMutation.isLoading || deleteMutation.isLoading
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMaterials;
