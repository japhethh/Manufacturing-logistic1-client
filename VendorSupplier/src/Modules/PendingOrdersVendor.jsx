import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingOrdersVendor = () => {
  const [orders, setOrders] = useState([]);
  const [supplierDetails, setSupplierDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get('/api/vendor/pending-orders');
        if (response.data.success) {
          setSupplierDetails(response.data.data);
          setOrders(response.data.data.purchaseOrders);
        } else {
          setError('Failed to fetch pending orders.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-black/70">Pending Orders</h1>

      {/* Supplier Details */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Supplier Details</h2>
        <p><strong>Name:</strong> {supplierDetails.supplierName}</p>
        <p><strong>Contact Person:</strong> {supplierDetails.contactPerson}</p>
        <p><strong>Email:</strong> {supplierDetails.contactEmail}</p>
        <p><strong>Phone:</strong> {supplierDetails.contactPhone}</p>
        <p><strong>Address:</strong> {`${supplierDetails.address.street}, ${supplierDetails.address.city}, ${supplierDetails.address.state}, ${supplierDetails.address.zipCode}, ${supplierDetails.address.country}`}</p>
        <p><strong>Payment Terms:</strong> {supplierDetails.paymentTerms}</p>
        <p><strong>Status:</strong> {supplierDetails.status}</p>
      </div>

      {/* Pending Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200 border-b-2 border-gray-300">
            <tr className="text-gray-600">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Purchase Order Number</th>
              <th className="text-left py-3 px-4">Order Date</th>
              <th className="text-left py-3 px-4">Total Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4 hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 transition-colors duration-200 text-black/70"
                >
                  <td className="py-4 px-6 border-b">{order._id}</td>
                  <td className="py-4 px-6 border-b">{order.purchaseOrderNumber}</td>
                  <td className="py-4 px-6 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 border-b">{`₱${order.totalAmount.toLocaleString()}`}</td>
                  <td className="py-4 px-6 border-b">
                    <span className="px-2 py-1 text-sm rounded-md bg-yellow-300 text-gray-800">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b hidden md:table-cell">
                    <button className="btn btn-sm btn-primary mr-2">View</button>
                    <button className="btn btn-sm btn-secondary">Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          className={`btn btn-sm btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          className={`btn btn-sm btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingOrdersVendor;
