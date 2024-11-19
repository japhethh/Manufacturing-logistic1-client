import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "datatables.net-dt";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ReceiveOrdersVendor = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const { token, userData } = verifyStore();

  useEffect(() => {
    fetchPendingOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      initializeDataTable();
    }
  }, [orders]);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/vendor/getAllReceivingOrders`,
        {
          headers: {
            token,
          },
        }
      );
      setOrders(response.data.receivingOrders);
      console.log(response.data.receivingOrders);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initializeDataTable = () => {
    // Initialize DataTable
    const table = new DataTable("#ordersTable", {
      data: orders,
      columns: [
        { title: "Order ID", data: "_id" },
        { title: "Purchase Order Number", data: "purchaseOrderNumber" },
        {
          title: "Order Date",
          data: "orderDate",
          render: (data) => new Date(data).toLocaleDateString(),
        },
        {
          title: "Total Amount",
          data: "totalAmount",
          render: (data) => `₱${data.toLocaleString()}`,
        },
        {
          title: "Status",
          data: "orderStatus",
          render: (data) => {
            const statusClass =
              {
                Pending: "bg-orange-500",
                "In Process": "bg-green-500",
                Approved: "bg-blue-500",
                Rejected: "bg-red-500",
                Shipped: "bg-yellow-500",
                Delivered: "bg-purple-500",
              }[data] || "";
            return `<span class="btn btn-ghost btn-xs ${statusClass} text-white">${data}</span>`;
          },
        },
        {
          title: "Actions",
          data: null,
          render: (data) => `
            <div class="flex space-x-2">
              <button class="btn btn-secondary btn-sm" onclick="viewOrder('${data._id}')">View</button>
            </div>
          `,
        },
      ],
      order: [[2, "desc"]],

      destroy: true, // Allows reinitialization of DataTable
    });

    // Expose viewOrder function to be called from the DataTable
    window.viewOrder = (orderId) => {
      const order = orders.find((o) => o._id === orderId);
      if (order) openModal(order);
    };
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    try {
      await axios.put(
        `${apiURL}/api/vendor/purchaseOrders/rejected/${selectedOrder._id}`,
        {},
        {
          headers: { token },
        }
      );
      toast.success("Order rejected successfully!");
      fetchPendingOrders();
    } catch (err) {
      toast.error("Error rejecting the order.");
      console.error(err);
    } finally {
      setRejectModalOpen(false);
      setReason("");
      setSelectedOrder(null);
    }
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
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
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
      </div>

      {/* Pending Orders Table */}
      <div className="overflow-x-auto mb-6">
        <table id="ordersTable" className="table w-full">
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
          <tbody>{/* DataTable will populate this */}</tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reject Order</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="textarea w-full border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
            />
            <div className="modal-action">
              <button onClick={handleReject} className="btn btn-error">
                Confirm
              </button>
              <button onClick={() => setRejectModalOpen(false)} className="btn">
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
            <NavLink to={`/createinvoicevendor/${selectedOrder._id}`}>
              <button className="bg-blue-500 px-2 py-1 font-semibold btn text-base-200 absolute right-12 top-2">
                Create Invoice
              </button>
            </NavLink>
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Purchase Order Number:</strong>{" "}
                {selectedOrder.purchaseOrderNumber}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Amount:</strong> ₱
                {selectedOrder.totalAmount.toLocaleString()}
              </p>
              <p>
                <strong>Order Status:</strong> {selectedOrder.orderStatus}
              </p>
              <p>
                <strong>Reason for Rejection:</strong>{" "}
                {selectedOrder.rejectionReason || "N/A"}
              </p>
              <p>
                <strong>PDF:</strong>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  href={selectedOrder.pdfURL}
                >
                  Download
                </a>{" "}
              </p>
            </div>

            {/* Items Table */}
            <h4 className="font-semibold mt-4">Items in Order:</h4>
            <table className="table w-full mt-2">
              <thead className="bg-gray-200">
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
      )}
    </div>
  );
};

export default ReceiveOrdersVendor;
