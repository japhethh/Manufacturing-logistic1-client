import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PurchaseOrderList = () => {
  const { apiURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  // Pagination, sorting, and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "purchaseOrderNumber", direction: "ascending" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPurchaseOrder();
  }, []);

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/purchase-order/`);
      setPurchaseOrderData(response.data);
    } catch (error) {
      toast.error("Error fetching purchase orders.");
    }
  };

  const deletePurchaseOrder = async () => {
    try {
      await axios.post(`${apiURL}/api/purchase-order/delete/${selectedOrderId}`);
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

  // Updated sorting function
  const sortedData = () => {
    let sortedOrders = [...purchaseOrderData];
    if (sortConfig !== null) {
      sortedOrders.sort((a, b) => {
        const aValue = sortConfig.key === "supplier" ? a.supplier?.supplierName : a[sortConfig.key];
        const bValue = sortConfig.key === "supplier" ? b.supplier?.supplierName : b[sortConfig.key];

        return sortConfig.direction === "ascending" ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
      });
    }
    return sortedOrders.filter(order =>
      order.purchaseOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.supplier?.supplierName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const requestSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === "ascending") ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = sortedData().slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
          onClick={() => navigate("/createpurchaseorder")}
        >
          + Create Purchase Order
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 mb-4"
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
              <th className="py-2 px-4 cursor-pointer" onClick={() => requestSort("purchaseOrderNumber")}>
                PO Number {getSortArrow("purchaseOrderNumber")}
              </th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => requestSort("supplier")}>
                Supplier {getSortArrow("supplier")}
              </th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => requestSort("totalAmount")}>
                Total Amount {getSortArrow("totalAmount")}
              </th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => requestSort("orderStatus")}>
                Status {getSortArrow("orderStatus")}
              </th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{indexOfFirstOrder + index + 1}</td>
                <td className="py-2 px-4">{order.purchaseOrderNumber}</td>
                <td className="py-2 px-4">{order.supplier?.supplierName || "N/A"}</td>
                <td className="py-2 px-4">{order.totalAmount}</td>
                <td className="py-2 px-4">{order.orderStatus}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate(`/purchase_orders/view_po/${order._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
