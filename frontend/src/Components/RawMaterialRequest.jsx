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
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination and sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "requestDate", direction: "ascending" });

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

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await axios.put(
        `${apiURL}/api/rawmaterial/updateStatus/${requestId}`,
        { requestStatus: newStatus }
      );
      if (response.data.success) {
        fetchRequests();
        toast.success("Request status updated successfully.");
      }
    } catch (error) {
      toast.error("Error updating request status.");
    }
  };

  const handleEdit = (request) => {
    const requestData = {
      supplier: request.supplier, 
      orderDate: new Date(),
      items: request.material.map((material) => ({
        name: material.materialName,
        quantity: material.quantity,
        price: 0,
        discount: 0,
      })),
      tax: 0,
      notes: "",
      paymentTerm: "",
    };
    navigate(`/purchase-order/edit`, { state: { requestData } });
  };

  // Sorting functionality
  const sortedRequests = () => {
    let sorted = [...requests];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "ascending"
          ? aValue < bValue ? -1 : 1
          : aValue > bValue ? -1 : 1;
      });
    }
    return sorted;
  };

  const requestSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === "ascending") ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  // Filter by search term
  const filteredRequests = sortedRequests().filter(request =>
    request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Raw Material Requests</h1>
        <button
          className="bg-blue-600 text-white font-semibold text-xs md:text-md lg:text-base px-4 py-2 rounded-full w-[150px] md:w-[180px]"
          onClick={() => navigate("/create-request")}
        >
          + Create Request
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by requested by..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-2 py-1 mb-4"
      />

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
                <th className="py-2 px-4 cursor-pointer" onClick={() => requestSort("requestDate")}>
                  Requested Date {sortConfig.key === "requestDate" ? (sortConfig.direction === "ascending" ? '▲' : '▼') : ''}
                </th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Requested By</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Materials</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.length > 0 ? (
                currentRequests.map((request, index) => (
                  <tr key={request._id} className="border-b">
                    <td className="py-2 px-4">{indexOfFirstRequest + index + 1}</td>
                    <td className="py-2 px-4">{new Date(request.requestDate).toLocaleString()}</td>
                    <td className="px-4 py-2 border">
                      <select
                        value={request.requestStatus}
                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
                        className={`rounded-full px-2 py-1 font-semibold text-base-200 ${request.requestStatus === "Pending" ? "bg-yellow-500" : request.requestStatus === "Approved" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-2 px-4">{request.requestedBy}</td>
                    <td className="py-2 px-4">{request.priority}</td>
                    <td className="py-2 px-4">
                      {request.material.map((material) => (
                        <div key={material._id}>
                          {material.materialName} (Qty: {material.quantity} {material.unit})
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => handleEdit(request)}
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
                  <td colSpan="7" className="py-4 text-center">No requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
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
