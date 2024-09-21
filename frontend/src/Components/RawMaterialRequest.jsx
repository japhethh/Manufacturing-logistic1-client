import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const RawMaterialRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [deleteRequestId, setDeleteRequestId] = useState(null); // State to store the ID for deletion
  const navigate = useNavigate(); // for navigation

  const { apiURL } = useContext(UserContext);

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/rawmaterial/request`);
      setRequests(response.data);
    } catch (error) {
      setError("Error fetching raw material requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAutoFill = (requestId) => {
    navigate(`/purchase-order/edit/${requestId}`);
  };

  // Open modal and set request ID to delete
  const openDeleteModal = (id) => {
    setDeleteRequestId(id);
    setModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/api/rawmaterial/delete/${deleteRequestId}`
      );
      if (response.data.success) {
        fetchRequests();
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting the request.");
    } finally {
      setModalOpen(false);
    }
  };

  // Function to handle status change
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await axios.put(
        `${apiURL}/api/rawmaterial/updateStatus/${requestId}`,
        {
          requestStatus: newStatus,
        }
      );
      if (response.data.success) {
        fetchRequests(); // Refresh the list after updating
        toast.success("Request status updated successfully.");
      }
    } catch (error) {
      toast.error("Error updating request status.");
    }
  };

  return (
    <div className="p-6">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this raw material request?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end w-full mb-4">
        <button className="px-4 py-2 text-sm rounded-full bg-blue-700 text-white">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="table w-full text-sm border table-xs">
            <thead>
              <tr className="text-gray-700 bg-stone-200">
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border">Requested Date</th>
                <th className="px-4 py-2 border">Requested Status</th>
                <th className="px-4 py-2 border">Requested By</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Material Name</th>
                <th className="px-4 py-2 border">Unit</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Remarks</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 font-bold border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {formatDate(request.requestDate)}
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={request.requestStatus}
                        onChange={(e) =>
                          handleStatusChange(request._id, e.target.value)
                        }
                        className={`rounded-full px-2 py-1 font-semibold text-base-200 ${
                          request.requestStatus === "Pending"
                            ? "bg-yellow-500"
                            : request.requestStatus === "Approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">{request.requestedBy}</td>
                    <td className="px-4 py-2 border">{request.priority}</td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.materialName}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.unit}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.quantity}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>
                          {material?.materialId?.pricePerUnit
                            ? `$${material.materialId.pricePerUnit}`
                            : "N/A"}
                        </div>
                      ))}
                    </td>

                    <td className="px-4 py-2 border">
                      {request.remarks || "No remarks"}
                    </td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        className="px-4 py-2 text-sm rounded-full bg-green-700 text-white "
                        onClick={() => handleAutoFill(request._id)}
                      >
                        Create PO
                      </button>
                      <button
                        className="px-4 py-2 text-sm rounded-full bg-red-700 text-white"
                        onClick={() => openDeleteModal(request._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-4 py-2 text-center border">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RawMaterialRequest;
