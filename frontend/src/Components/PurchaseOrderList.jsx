import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PurchaseOrderList = () => {
  const { apiURL, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
          onClick={() => navigate("/createpurchaseorder")}
        >
          + Create Purchase Order
        </button>
      </div>

      <div className="overflow-x-auto mt-6 border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">PO Number</th>
              <th className="py-2 px-4">Supplier</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrderData.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
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
