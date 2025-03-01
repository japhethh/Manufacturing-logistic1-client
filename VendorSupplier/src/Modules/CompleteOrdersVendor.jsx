import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import { toast } from "react-toastify";

const CustomerOrdersVendor = () => {
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

  useEffect(() => {
    fetchPendingOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch pending orders from the API
  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/vendor/getAllCompleteOrders`,
        {
          headers: {
            token, // Use Bearer token for authorization
          },
        }
      );
      setOrders(response.data.completeOrders);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update orders after approval/rejection
  const handleUpdate = () => {
    fetchPendingOrders();
  };

  // Approve an order
  const approveOrder = async (orderId) => {
    try {
      await axios.put(
        `${apiURL}/api/vendor/purchaseOrders/approve/${orderId}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      handleUpdate();
      toast.success("Successfully Approved!");
    } catch (error) {
      console.error(
        "Failed to approve order:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data || error.message);
    }
  };

  // Confirm Approval
  const confirmApprove = () => {
    approveOrder(currentOrderId);
    setApproveModalOpen(false);
    setCurrentOrderId(null);
  };

  // Reject an order
  const handleReject = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    try {
      await axios.put(
        `${apiURL}/api/vendor/rejectOrder/${selectedOrder._id}`,
        { reason },
        {
          headers: { token },
        }
      );
      toast.success("Order rejected successfully!");
      handleUpdate(); // Refresh orders
    } catch (err) {
      toast.error("Error rejecting the order.");
      console.error(err);
    } finally {
      setRejectModalOpen(false); // Close the modal
      setReason(""); // Reset reason input
      setSelectedOrder(null); // Reset selected order
    }
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

  // Close Reject Modal
  const closeRejectModal = () => {
    setSelectedOrder(null);
    setRejectModalOpen(false);
    setReason("");
  };

  // Loader and Error Handling
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen shadow-lg rounded-lg relative">
      <h1 className="text-4xl font-bold mb-6 text-black/70">Receive Orders</h1>

      {/* Supplier Details */}
      {/* <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Supplier Details</h2>
        <p>
          <strong>Name:</strong> {userData.supplierName}
        </p>
        <p>
          <strong>Contact Person:</strong> {userData.contactPerson}
        </p>
        <p>
          <strong>Email:</strong> {userData.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {userData.contactPhone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${userData.address?.street}, ${userData.address?.city}, ${userData.address?.state}, ${userData.address?.zipCode}, ${userData.address?.country}`}
        </p>
        <p>
          <strong>Payment Terms:</strong> {userData.paymentTerms}
        </p>
        <p>
          <strong>Status:</strong> {userData.status}
        </p>
      </div> */}

      {/* Pending Orders Table */}
      <div className="overflow-x-auto mb-6">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr className="text-gray-600">
              <th>Order ID</th>
              <th>Purchase Order Number</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th className="hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td>{order._id}</td>
                  <td>{order.purchaseOrderNumber}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{`₱${order.totalAmount.toLocaleString()}`}</td>
                  <td>
                    <span
                      className={`btn btn-ghost btn-xs ${
                        order?.orderStatus === "Pending"
                          ? "bg-orange-500 text-white"
                          : order?.orderStatus === "In Process"
                          ? "bg-green-500 text-white"
                          : order?.orderStatus === "Approved"
                          ? "bg-blue-500 text-white"
                          : order?.orderStatus === "Rejected"
                          ? "bg-red-500 text-white"
                          : order?.orderStatus === "Shipped"
                          ? "bg-yellow-500 text-white"
                          : order?.orderStatus === "Delivered"
                          ? "bg-purple-500 text-white"
                          : order?.orderStatus === "Completed"
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex space-x-2">
                      {/* <button
                        onClick={() => handleApproveClick(order._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openRejectModal(order)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button> */}
                      <button
                        onClick={() => openModal(order)}
                        className="btn btn-secondary btn-sm"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approve Confirmation Modal */}
      {approveModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Approval</h3>
            <p className="py-4">Are you sure you want to approve this order?</p>
            <div className="modal-action">
              <button onClick={confirmApprove} className="btn btn-primary">
                Yes, Approve
              </button>
              <button
                onClick={() => setApproveModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectModalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reject Order</h3>
            <p className="py-4">
              Please provide a reason for rejecting the order.
            </p>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rejection"
            />
            <div className="modal-action">
              <button onClick={handleReject} className="btn btn-error">
                Reject
              </button>
              <button onClick={closeRejectModal} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {modalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box relative p-6">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4">Order Details</h3>

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

            {/* Order Details Box */}
            <div className="my-2 p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700">
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder._id}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Purchase Order Number:</span>{" "}
                {selectedOrder.purchaseOrderNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Order Status:</span>{" "}
                {selectedOrder.orderStatus}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Reason for Rejection:</span>{" "}
                {selectedOrder.rejectionReason || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">PDF:</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  href={selectedOrder.pdfURL}
                >
                  Download
                </a>
              </p>

              <p className="text-gray-700 ">
                <span className="font-semibold">Total Amount:</span> ₱
                {selectedOrder.totalAmount.toLocaleString()}
              </p>
            </div>

            {/* Items Table */}
            <div className="my-2 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold text-lg mb-2">Items in Order:</h4>
              <table className="table w-full">
                <thead className=" bg-blue-800 text-white">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₱{item.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersVendor;
