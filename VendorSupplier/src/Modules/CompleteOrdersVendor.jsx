import React, { useState } from 'react';

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

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen p-6 bg-white text-black/70">
      <h1 className="text-3xl font-bold mb-4">Completed Orders</h1>

      {/* Search Input */}
      <div className="form-control mb-6 max-w-lg">
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
        <table className="table w-full bg-gray-50 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-black/70 py-3">#</th>
              <th className="text-black/70 py-3">Order Number</th>
              <th className="text-black/70 py-3">Supplier</th>
              <th className="text-black/70 py-3">Date</th>
              <th className="text-black/70 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                  <td className="text-black/70 py-2">{indexOfFirstOrder + index + 1}</td>
                  <td className="text-black/70 py-2">{order.orderNumber}</td>
                  <td className="text-black/70 py-2">{order.supplier}</td>
                  <td className="text-black/70 py-2">{order.date}</td>
                  <td>
                    <span className="badge badge-success">{order.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-black/70 py-2">No completed orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination with Next/Previous Buttons */}
      {filteredOrders.length > ordersPerPage && (
        <div className="flex flex-col items-center mt-6">
          <div className="flex space-x-2 mb-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'} transition duration-150 ease-in-out`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="flex justify-between w-full max-w-md">
            <button
              onClick={prevPage}
              className={`btn btn-sm btn-outline text-black/50 ${currentPage === 1 ? 'btn-disabled' : ''} transition duration-150 ease-in-out`}
            >
              Previous
            </button>

            <button
              onClick={nextPage}
              className={`btn btn-sm btn-outline text-black/50 ${currentPage === totalPages ? 'btn-disabled' : ''} transition duration-150 ease-in-out`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteOrdersVendor;
