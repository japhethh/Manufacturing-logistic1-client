import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Store from "../context/Store";
import DataTable from "datatables.net";
import { toast } from "react-toastify";

const RawMaterialRequest = () => {
  const { fetchUserData, userData } = Store();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [dataId, setDataId] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true); // Make sure loading is set to true before making the request.
    try {
      const response = await axios.get(`${apiURL}/api/rawmaterial/request`);
      setRequests(response.data);
      console.log(response.data);
      setLoading(false); // Make sure loading is set to false once data is fetched.
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Error fetching data");
      setError("Error fetching raw material requests.");
      setLoading(false); // Make sure loading is set to false even if an error occurs.
    }
  };

  const navigate = useNavigate();
  const { apiURL, token } = useContext(UserContext);
  console.log(dataId);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: requests,
      columns: [
        {
          title: "Raw Material Number #",
          data: "_id",
          render: (data) => `${data ? data : `<span>${data}</span>`}`,
        },
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
              Approved: "bg-blue-200 text-blue-800",
              Rejected: "bg-red-200 text-red-800",
              Pending: "bg-gray-200 text-gray-800",
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
            const requestStatus = data?.requestStatus;
            const isProcessed =
              requestStatus === "Approved" ||
              requestStatus === "Rejected"  
            return `
              <div class="py-2 px-4 flex gap-2">
                ${
                  userData?.role === "admin" ||
                  userData?.role === "logistic" ||
                  userData?.role === "superAdmin"
                    ? `
                      <button
                        class="px-3 py-1 text-sm font-medium rounded ${
                          isProcessed
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }"
                        id="approveBtn_${data._id}" 
                        ${isProcessed ? "disabled" : ""}
                      >
                        ${requestStatus === "Approved" ? "Approved" : "Approve"}
                      </button>
                      <button
                        class="px-3 py-1 text-sm font-medium rounded ${
                          isProcessed
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }"
                        id="rejectBtn_${data._id}"
                        ${isProcessed ? "disabled" : ""}
                      >
                        ${requestStatus === "Rejected" ? "Rejected" : "Reject"}
                      </button>
                    `
                    : ""
                }
                ${
                  userData?.role === "superAdmin"
                    ? `
                      <button
                        class="font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                        id="createPOBtn_${data._id}"
                        ${isProcessed ? "" : ""}
                      >
                        Create PO
                      </button>
                      <button
                        class="bg-white border border-red-500 font-semibold text-red-500 px-4 py-2 rounded hover:bg-red-100"
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
      order: [[1, "desc"]],
      rowCallback: (row, data) => {
        if (userData?.role === "superAdmin") {
          const createPOBtn = row.querySelector(`#createPOBtn_${data._id}`);
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);
          createPOBtn.addEventListener("click", () => handleEdit(data));
          deleteBtn.addEventListener("click", () => openDeleteModal(data._id));
        }
        const approveBtn = row.querySelector(`#approveBtn_${data._id}`);
        const rejectBtn = row.querySelector(`#rejectBtn_${data._id}`);

        if (approveBtn) {
          approveBtn.addEventListener("click", () =>
            openApproveModel(data?._id)
          );
        }

        if (rejectBtn) {
          rejectBtn.addEventListener("click", () => openRejectModel(data?._id));
        }
      },
    });
    return () => {
      table.destroy();
    };
  }, [requests]);

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
          headers: { token: token },
        }
      );
      fetchRequests();
      setApproveModalOpen(false);
      toast.success("Raw Material Request Approved.");
    } catch (error) {
      toast.error(error?.response.data.message);
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
          headers: { token: token },
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

  return (
    <div className="p-6">
      {/* {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-white mt-2">Loading...</p>
          </div>
        </div>
      )} */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Raw Material Requests
        </h1>
        <button
          className="bg-blue-600 text-white font-semibold text-xs md:text-md lg:text-base px-6 py-3 rounded-lg transition-all transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] md:w-[180px]"
          onClick={() => navigate("/create-request")}
        >
          + Create Request
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {loading ? (
          <div className="py-4 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-sm table-auto" id="myTable">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Request Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">{/* Table Rows here */}</tbody>
          </table>
        )}
      </div>
      {/* Delete Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-xl transition-all transform scale-95 hover:scale-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete this request?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={() => {
                  setModalOpen(false);
                  setDataId("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Approve Modal */}
      {approveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-xl transition-all transform scale-95 hover:scale-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Approval
            </h3>
            <p className="text-gray-600">
              Are you sure you want to approve this request?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={() => setApproveModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={confirmApprove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-xl transition-all transform scale-95 hover:scale-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Reject
            </h3>
            <p className="text-gray-600">
              Are you sure you want to reject this request?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={() => setRejectModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
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
