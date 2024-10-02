import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing icons from React Icons

const CompleteOrdersVendor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Sample data for completed orders
  const orders = [
    { id: 1, orderNumber: 'ORD001', supplier: 'Supplier A', date: '2024-09-30', status: 'Complete' },
    { id: 2, orderNumber: 'ORD002', supplier: 'Supplier B', date: '2024-09-28', status: 'Complete' },
    { id: 3, orderNumber: 'ORD003', supplier: 'Supplier C', date: '2024-09-25', status: 'Complete' },
    { id: 4, orderNumber: 'ORD004', supplier: 'Supplier D', date: '2024-09-22', status: 'Complete' },
    { id: 5, orderNumber: 'ORD005', supplier: 'Supplier E', date: '2024-09-18', status: 'Complete' },
    { id: 6, orderNumber: 'ORD006', supplier: 'Supplier F', date: '2024-09-15', status: 'Complete' },
    // Add more sample data as needed
  ];

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-black/70">Completed Orders</h1>

      {/* Search Input */}
      <div className="form-control mb-6">
        <input 
          type="text" 
          placeholder="Search orders by Order Number or Supplier..." 
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-black/70">#</th>
              <th className="text-black/70">Order Number</th>
              <th className="text-black/70">Supplier</th>
              <th className="text-black/70">Date</th>
              <th className="text-black/70">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="text-black/70">{indexOfFirstOrder + index + 1}</td>
                  <td className="text-black/70">{order.orderNumber}</td>
                  <td className="text-black/70">{order.supplier}</td>
                  <td className="text-black/70">{order.date}</td>
                  <td>
                    <span className="badge badge-success">{order.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-black/70">No completed orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > ordersPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            className={`btn btn-outline btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="h-5 w-5 text-black/70" />
          </button>
          <span className="text-black/70">Page {currentPage} of {totalPages}</span>
          <button
            className={`btn btn-outline btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="h-5 w-5 text-black/70" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompleteOrdersVendor;
