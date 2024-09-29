import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash, FiEye } from "react-icons/fi";

const PurchaseOrderList = () => {
  const { apiURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Pagination, sorting, and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "purchaseOrderNumber",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPurchaseOrder();
  }, []);

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/purchase-order/`);
      const updatedOrders = response.data.map((order) => {
        // Calculate totalAmount if items exist
        const totalAmount = order.items
          ? order.items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0)
          : 0;
        return { ...order, totalAmount }; // Add totalAmount to the order
      });
      setPurchaseOrderData(updatedOrders);
    } catch (error) {
      toast.error("Error fetching purchase orders.");
    }
  };

  const deletePurchaseOrder = async () => {
    try {
      await axios.post(
        `${apiURL}/api/purchase-order/delete/${selectedOrderId}`
      );
      fetchPurchaseOrder();
      toast.success("Purchase Order deleted successfully.");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete purchase order.");
    }
  };

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const sortedData = () => {
    const filteredOrders = purchaseOrderData.filter(
      (order) =>
        order.purchaseOrderNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (order.supplier?.supplierName || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    return filteredOrders.sort((a, b) => {
      const aValue =
        sortConfig.key === "supplierName"
          ? a.supplier?.supplierName
          : a[sortConfig.key];
      const bValue =
        sortConfig.key === "supplierName"
          ? b.supplier?.supplierName
          : b[sortConfig.key];

      return sortConfig.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return "";
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = sortedData().slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button
          className="bg-blue-600 text-white font-semibold text-xs md:text-md lg:text-base px-4 py-2 rounded-full w-[135px] md:w-[220px] lg:w-[220px]"
          onClick={() => navigate("/createpurchaseorder")}
        >
          + Create Purchase Order
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          placeholder="Search by PO Number or Supplier"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("purchaseOrderNumber")}
              >
                PO Number {getSortArrow("purchaseOrderNumber")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("supplierName")}
              >
                Supplier {getSortArrow("supplierName")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("totalAmount")}
              >
                Total Amount {getSortArrow("totalAmount")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("orderStatus")}
              >
                Order Status {getSortArrow("orderStatus")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("approvalStatus")}
              >
                Approval Status {getSortArrow("")}
              </th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{indexOfFirstOrder + index + 1}</td>
                <td className="py-2 px-4">{order.purchaseOrderNumber}</td>
                <td className="py-2 px-4">
                  {order.supplier?.supplierName || "N/A"}
                </td>
                <td className="py-2 px-4">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.totalAmount)}
                </td>
                <td className="py-2 px-4">
                  <div
                    className={`border text-gray-700 font-semibold text-center rounded-md p-1 ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 border-yellow-300"
                        : order.orderStatus === "In Process"
                        ? "bg-blue-100 border-blue-300"
                        : order.orderStatus === "Shipped"
                        ? "bg-green-100 border-green-300"
                        : order.orderStatus === "Delivered"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-gray-200 border-gray-400" // Default case for unknown statuses
                    }`}
                  >
                    {order.orderStatus}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div
                    className={`border text-gray-700 font-semibold text-center rounded-md p-1 ${
                      order.financeApproval.status === "Pending"
                        ? "bg-yellow-100 border-yellow-300"
                        : order.financeApproval.status === "Reviewed"
                        ? "bg-blue-100 border-blue-300"
                        : order.financeApproval.status === "Approved"
                        ? "bg-green-100 border-green-300"
                        : order.financeApproval.status === "Rejected"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-gray-200 border-gray-400" // Default case for unknown statuses
                    }`}
                  >
                    {order.financeApproval.status}
                  </div>
                </td>
                <td className="py-2 px-4">
                  {order.pdfURL ? (
                    <a
                      href={order.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span>Generating PDF...</span> // You can show a loading state or N/A
                  )}
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                    onClick={() =>
                      navigate(`/purchase_orders/view_po/${order._id}`)
                    }
                  >
                    <FiEye className="inline" /> View
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    <FiTrash className="inline" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this purchase order?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={deletePurchaseOrder}
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

export default PurchaseOrderList;
