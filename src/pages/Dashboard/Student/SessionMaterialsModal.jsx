import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SessionMaterialsModal = ({ sessionId, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axiosSecure.get(`/materials/by-session/${sessionId}`);
        setMaterials(res.data);
      } catch (err) {
        console.error("Error loading materials:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchMaterials();
    }
  });

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Session Materials</h2>

        {loading ? (
          <p>Loading...</p>
        ) : materials.length === 0 ? (
          <p>No materials available for this session.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((mat) => (
              <div key={mat._id} className="border p-4 rounded shadow">
                <h3 className="font-medium mb-2">{mat.title}</h3>
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <a
                  href={mat.image}
                  download
                  className="btn btn-sm btn-outline w-full mb-2"
                >
                  Download Image
                </a>
                <a
                  href={mat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Google Drive Resource
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="modal-action">
          <button onClick={onClose} className="btn btn-error text-white">Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default SessionMaterialsModal;
