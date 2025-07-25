import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UploadMaterial = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [approvedSessions, setApprovedSessions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    studySessionId: "",
    link: "",
    image: "", // image URL (uploaded to imgbb manually or separately)
  });

  // ✅ Fetch approved sessions by this tutor
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/courses?email=${user.email}&status=approved`)
        .then((res) => {
          setApprovedSessions(res.data.courses)
        })
        .catch((err) => console.error("Failed to fetch approved sessions:", err));
    }
  }, [user?.email, axiosSecure]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit material
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, studySessionId, link, image } = formData;
    if (!title || !studySessionId || !link || !image) {
      return Swal.fire("Missing Fields", "Please fill out all fields.", "warning");
    }

    const materialData = {
      ...formData,
      tutorEmail: user.email,
      uploadedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/materials", materialData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "Material uploaded successfully!", "success");
        setFormData({ title: "", studySessionId: "", link: "", image: "" });
      } else {
        Swal.fire("❌ Error", "Failed to upload material.", "error");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      Swal.fire("❌ Server Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#3498db]">Upload Study Material</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">

        {/* Title */}
        <div>
          <label className="font-semibold block mb-1">Material Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Select Session */}
        <div>
          <label className="font-semibold block mb-1">Select Approved Session</label>
          <select
            name="studySessionId"
            className="select select-bordered w-full"
            value={formData.studySessionId}
            onChange={handleChange}
          >
            <option value="">-- Select a Session --</option>
            {approvedSessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tutor Email */}
        <div>
          <label className="font-semibold block mb-1">Tutor Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-100"
            value={user.email}
            readOnly
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="font-semibold block mb-1">Image URL (from imgbb)</label>
          <input
            type="text"
            name="image"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://i.ibb.co/..."
          />
        </div>

        {/* Google Drive Link */}
        <div>
          <label className="font-semibold block mb-1">Google Drive / Docs Link</label>
          <input
            type="url"
            name="link"
            className="input input-bordered w-full"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Upload Material
        </button>
      </form>
    </div>
  );
};

export default UploadMaterial;
