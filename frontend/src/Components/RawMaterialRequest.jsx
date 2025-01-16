import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import DataTable from "datatables.net-dt";
import Store from "../context/Store";

const RawMaterialRequest = () => {
  const { fetchUserData, userData } = Store();

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(userData);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [dataId, setDataId] = useState("");
  // Pagination and sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "requestDate",
    direction: "ascending",
  });

  const navigate = useNavigate();
  const { apiURL, token } = useContext(UserContext);

  console.log(dataId);
  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: requests,
      columns: [
        {
          title: "Reference",
          data: null,
          render: (data) =>
            `${data?.rawmaterialNumber ? data?.rawmaterialNumber : "N/A"}`,
        },
        {
          title: "requestDate",
          data: null,
          render: (data) =>
            `${
              data?.requestDate
                ? new Date(data.requestDate).toLocaleString()
                : "N/A"
            }`,
        },
        {
          title: "Requested By",
          data: null,
          render: (data) => `${data?.requestedBy ? data?.requestedBy : "N/A"}`,
        },
        {
          title: "Materials",
          data: null,
          render: (data) => {
            // Check if 'material' exists and contains items
            if (data?.material && data.material.length > 0) {
              return data.material
                .map(
                  (material) =>
                    `<div>• <strong>${
                      material.materialName || "N/A"
                    }</strong>: ${material.quantity || "N/A"} ${
                      material.unit || "N/A"
                    }</div>`
                )
                .join(""); // Join the materials with no separator for proper line breaks
            } else {
              return "N/A";
            }
          },
        },
        {
          title: "Request Status",
          data: null,
          render: (data) => {
            const status = data?.requestStatus;
            const statusClasses = {
              Approved: "bg-blue-400 text-white",
              Rejected: "bg-red-400 text-white",
              Pending: "bg-gray-400 text-white",
            };

            return `
              <div class="flex justify-center">
                <button class="py-1 px-2 rounded-full ${
                  statusClasses[status] || "bg-gray-200 text-black"
                }">
                  ${status || "N/A"}
                </button>
              </div>
            `;
          },
        },
        {
          title: "Action",
          data: null,
          render: (data) => {
            return `
              <div class="py-2 px-4 flex gap-2">
                ${
                  userData?.role === "admin" || userData?.role === "superAdmin"
                    ? `
                      <button
                        class="bg-blue-500 font-semibold text-white px-4 py-2 rounded"
                        id="approveBtn_${data._id}"
                      >
                        Approve
                      </button>
                      <button
                        class="bg-red-500 font-semibold text-white px-4 py-2 rounded"
                        id="rejectBtn_${data._id}"
                      >
                        Reject
                      </button>
                    `
                    : ""
                }
                ${
                  userData?.role === "superAdmin"
                    ? `
                      <button
                        class="bg-green-500 font-semibold text-white px-4 py-2 rounded"
                        id="createPOBtn_${data._id}"
                      >
                        Create PO
                      </button>
                      <button
                        class="bg-white-500 border border-red-500 font-semibold text-red-500 px-4 py-2 rounded"
                        id="deleteBtn_${data._id}"
                      >
                        Delete
                      </button>
                    `
                    : ""
                }
              </div>`;
          },
        },
      ],
      order: [[0, "desc"]],
      rowCallback: (row, data) => {
        if (userData?.role === "superAdmin") {
          const createPOBtn = row.querySelector(`#createPOBtn_${data._id}`);
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);

          createPOBtn.addEventListener("click", () => handleEdit(data));
          deleteBtn.addEventListener("click", () => openDeleteModal(data._id));
        }

        const approveBtn = row.querySelector(`#approveBtn_${data._id}`);
        const rejectBtn = row.querySelector(`#rejectBtn_${data._id}`);

        // Attach event listeners for buttons

        approveBtn.addEventListener("click", () => openApproveModel(data._id));
        rejectBtn.addEventListener("click", () => openRejectModel(data._id));
      },
    });

    return () => {
      table.destroy();
    };
  }, [requests]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/rawmaterial/request`);
      setRequests(response.data);
      console.log(response.data);
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
      setDataId("");
    } catch (error) {
      toast.error("Failed to delete request.");
    } finally {
      setModalOpen(false);
    }
  };

  const openApproveModel = (id) => {
    setDataId(id);
    setApproveModalOpen(true);
  };

  const confirmApprove = async () => {
    try {
      await axios.put(
        `${apiURL}/api/rawmaterial/approveStatus/${dataId}`,
        { status: "Approved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
      setApproveModalOpen(false);
      toast.success("Raw Material Request Approved.");
    } catch (error) {
      toast.error("Failed to delete request.");
    } finally {
      setModalOpen(false);
    }
  };

  const openRejectModel = (id) => {
    setDataId(id);
    setRejectModalOpen(true);
  };

  const confirmReject = async () => {
    try {
      await axios.put(
        `${apiURL}/api/rawmaterial/rejectStatus/${dataId}`,
        { status: "Rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
      setRejectModalOpen(false);
      toast.success("Raw Material Request Rejected.");
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
          ? aValue < bValue
            ? -1
            : 1
          : aValue > bValue
          ? -1
          : 1;
      });
    }
    return sorted;
  };

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  // Filter by search term
  const filteredRequests = sortedRequests().filter((request) =>
    request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Raw Material Requests</h1>
        <button
          className="bg-blue-600 text-white font-semibold text-xs md:text-md lg:text-base px-4 py-2 rounded-md w-[150px] md:w-[180px]"
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
          <table className="min-w-full text-sm display" id="myTable">
            <thead className="bg-blue-800 text-white"></thead>
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
                onClick={() => {
                  setModalOpen(false);
                  setDataId("");
                }}
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

      {approveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Approve?</h3>
            <p>Are you sure you want to approve this request?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setApproveModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={confirmApprove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Reject?</h3>
            <p>Are you sure you want to reject this request?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setRejectModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={confirmReject}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialRequest;
