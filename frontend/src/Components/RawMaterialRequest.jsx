import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const RawMaterialRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const navigate = useNavigate();
  const { apiURL } = useContext(UserContext);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/rawmaterial/request`);
      setRequests(response.data);
    } catch (error) {
      setError("Error fetching raw material requests.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteRequestId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`${apiURL}/api/rawmaterial/delete/${deleteRequestId}`);
      fetchRequests();
      toast.success("Raw Material Request deleted.");
    } catch (error) {
      toast.error("Failed to delete request.");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Raw Material Requests</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
          onClick={() => navigate("/create-request")}
        >
          + Create Request
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Requested Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Requested By</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Material</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={request._id} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{request.requestDate}</td>
                    <td className="py-2 px-4">{request.requestStatus}</td>
                    <td className="py-2 px-4">{request.requestedBy}</td>
                    <td className="py-2 px-4">{request.priority}</td>
                    <td className="py-2 px-4">{request.materialName}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => navigate(`/purchase-order/edit/${request._id}`)}
                      >
                        Create PO
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => openDeleteModal(request._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this request?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialRequest;
