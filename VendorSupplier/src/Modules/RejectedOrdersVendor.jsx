import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { NavLink } from "react-router-dom"; // Assuming you need this for the View Modal
import DataTable from "datatables.net-dt";

const RejectedOrdersVendor = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null); // For View Modal
  const [modalOpen, setModalOpen] = useState(false); // View Modal

  const [reason, setReason] = useState(""); // For Reject Modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false); // Reject Modal

  const [approveModalOpen, setApproveModalOpen] = useState(false); // Approve Modal
  const [currentOrderId, setCurrentOrderId] = useState(null); // Current order ID for approval

  const { token, userData } = verifyStore();

  // const ENDPOINT = "http://localhost:4000";
  // Replace with your actual endpoint

  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io(ENDPOINT);

    // Listen for new orders
    newSocket.on("sendingOrder", (newOrder) => {
      console.log("Received new order via Socket.IO:", newOrder);
      setOrders((prev) => {
        // Prevent duplicate orders by checking if the order already exists
        if (!prev.some((order) => order._id === newOrder._id)) {
          return [...prev, newOrder];
        }
        return prev;
      });
    });

    // Listen for order approval updates
    newSocket.on("orderApproved", (data) => {
      toast.info(`Order ${data.orderId} has been approved.`);
      handleUpdate(); // Refresh orders
    });

    // Listen for order rejection updates
    newSocket.on("orderRejected", (data) => {
      toast.info(
        `Order ${data.orderId} has been rejected. Reason: ${data.reason}`
      );
      handleUpdate(); // Refresh orders
    });

    // Handle connection errors
    // newSocket.on("connect_error", (err) => {
    //   console.error('Socket connection error:', err.message);
    //   toast.error('Socket connection failed: ' + err.message);
    // });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [ENDPOINT, token]); // Re-run only if ENDPOINT or token changes

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: orders,
      columns: [
        {
          title: "Order ID",
          data: "_id",
        },
        {
          title: "Purchase Order Number",
          data: "purchaseOrderNumber",
        },
        {
          title: "Order Date",
          data: "orderDate",
        },
        {
          title: "Total Amount",
          data: "totalAmount",
        },
        {
          title: "Status",
          data: "orderStatus",
          render: (data) => `
            <span
              class="btn btn-ghost btn-xs ${
                data === "Pending"
                  ? "bg-orange-500 text-white"
                  : data === "In Process"
                  ? "bg-green-500 text-white"
                  : data === "Approved"
                  ? "bg-blue-500 text-white"
                  : data === "Rejected"
                  ? "bg-red-500 text-white"
                  : data === "Shipped"
                  ? "bg-yellow-500 text-white"
                  : data === "Delivered"
                  ? "bg-purple-500 text-white"
                  : ""
              }"
            >
              ${data}
            </span>
          `,
        },
        {
          title: "Action",
          data: null,
          render: (data) => `
            <div class="flex space-x-2">
              <button id="viewBtn_${data._id}" class="btn btn-secondary btn-sm">View</button>
            </div>
          `,
        },
      ],
      rowCallback: (row, data) => {
        const viewBtn = row.querySelector(`#viewBtn_${data._id}`);

        viewBtn?.addEventListener("click", () => openModal(data));
      },
      order: [[1, "desc"]],
    });

    return () => {
      table.destroy();
    };
  }, [orders]);

  useEffect(() => {
    fetchRejectedOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch pending orders from the API
  const fetchRejectedOrders = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/vendor/getAllRejectedOrders`,
        {
          headers: {
            token,
          },
        }
      );

      setOrders(response.data.rejectedOrders);
      console.log(response.data.rejectedOrders);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Update orders after approval/rejection
  const handleUpdate = () => {
    fetchRejectedOrders();
  };

  // Handle Approve Button Click (opens Approve Modal)
  const handleApproveClick = (orderId) => {
    setCurrentOrderId(orderId);
    setApproveModalOpen(true);
  };

  // Open View Modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  // Close View Modal
  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  // Open Reject Modal
  const openRejectModal = (order) => {
    setSelectedOrder(order);
    setRejectModalOpen(true);
  };

  // Loader and Error Handling
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchRejectedOrders}
          className="btn btn-sm btn-primary mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen shadow-lg rounded-lg relative">
      <h1 className="text-4xl font-bold mb-6 text-black/70">Rejected Orders</h1>

      {/* Supplier Details */}
      {/* <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Supplier Details</h2>
        <p>
          <strong>Name:</strong> {userData?.supplierName}
        </p>
        <p>
          <strong>Contact Person:</strong> {userData?.contactPerson}
        </p>
        <p>
          <strong>Email:</strong> {userData?.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {userData?.contactPhone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${userData?.address?.street}, ${userData?.address?.city}, ${userData?.address?.state}, ${userData?.address?.zipCode}, ${userData?.address?.country}`}
        </p>
        <p>
          <strong>Payment Terms:</strong> {userData?.paymentTerms}
        </p>
        <p>
          <strong>Status:</strong> {userData?.status}
        </p>
      </div> */}

      {/* Pending Orders Table */}
      <div className="overflow-x-auto mb-6">
        <table className="display" id="myTable">
          <thead className="bg-blue-800 text-white"></thead>
        </table>
      </div>

      {/* View Order Details Modal */}
      {modalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box relative p-6">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h3 className="font-bold text-lg mb-6 text-center">
              Order Details
            </h3>

            {/* Customer Information Box */}
            <div className="my-2 p-4 border rounded-lg bg-gray-50">
              <h1 className="font-semibold text-xl mb-2">
                Customer Information
              </h1>
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> Juswa
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> Juswa@gmail.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> 09511431876
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> Quezon City
              </p>
            </div>

            {/* Order Information Section */}
            <div className="p-4 border border-gray-300 rounded-md mb-6">
              <p className="mb-2">
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p className="mb-2">
                <strong>Purchase Order Number:</strong>{" "}
                {selectedOrder.purchaseOrderNumber}
              </p>
              <p className="mb-2">
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Total Amount:</strong>{" "}
                {`₱${selectedOrder.totalAmount.toLocaleString()}`}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {selectedOrder.category}
              </p>
              <p className="mb-2">
                <strong>Payment Terms:</strong> {selectedOrder.paymentTerm}
              </p>
              <p className="mb-2">
                <strong>Notes:</strong>{" "}
                {selectedOrder.notes || "No notes provided."}
              </p>
              <p>
                <strong>PDF:</strong>{" "}
                <a
                  href={selectedOrder.pdfURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </p>
            </div>

            {/* Items Section */}
            <div className="border-t border-gray-300 pt-4">
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div>
                  <h4 className="text-md font-semibold mb-4">Order Items</h4>
                  <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border">Item Name</th>
                        <th className="py-2 px-4 border">Quantity</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border">{item.name}</td>
                          <td className="py-2 px-4 border">{item.quantity}</td>
                          <td className="py-2 px-4 border">{`₱${item.price.toLocaleString()}`}</td>
                          <td className="py-2 px-4 border">{`₱${item.totalPrice.toLocaleString()}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No items in this order.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedOrdersVendor;
