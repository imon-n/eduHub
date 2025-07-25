import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaSearch, FaChalkboardTeacher, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MakeTutor = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedTutors", emailQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const isTutor = currentRole === "tutor";
    const action = isTutor ? "Remove Tutor" : "Make Tutor";
    const newRole = isTutor ? "user" : "tutor";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Make Tutor</h2>

      <div className="flex gap-2 mb-6 items-center">
        <FaSearch />
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>

      {isFetching && <p>Loading users...</p>}

      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
              .filter((u) => u.role !== "admin") // ✅ Filter out admins
              .map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "tutor" ? "badge-info" : "badge-ghost"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`btn btn-sm text-black ${
                        u.role === "tutor" ? "btn-error" : "btn-primary"
                      }`}
                    >
                      {u.role === "tutor" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Remove Tutor
                        </>
                      ) : (
                        <>
                          <FaChalkboardTeacher className="mr-1" />
                          Make Tutor
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeTutor;
