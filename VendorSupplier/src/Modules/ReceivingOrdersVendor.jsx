import React, { useState } from 'react';

const sampleOrders = [
  { id: 1, orderNumber: 'PO12345', vendor: 'Vendor A', status: 'Pending', dateReceived: '2024-09-30' },
  { id: 2, orderNumber: 'PO12346', vendor: 'Vendor B', status: 'Completed', dateReceived: '2024-09-29' },
  { id: 3, orderNumber: 'PO12347', vendor: 'Vendor C', status: 'Pending', dateReceived: '2024-09-28' },
  { id: 4, orderNumber: 'PO12348', vendor: 'Vendor D', status: 'Completed', dateReceived: '2024-09-27' },
  { id: 5, orderNumber: 'PO12349', vendor: 'Vendor E', status: 'Pending', dateReceived: '2024-09-26' },
  { id: 6, orderNumber: 'PO12350', vendor: 'Vendor F', status: 'Completed', dateReceived: '2024-09-25' },
  // Add more sample orders as needed
];

// Function to determine the status badge class
const getStatusBadge = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-400 text-white';
    case 'Completed':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-300 text-black';
  }
};

const ReceivingOrdersVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to display per page
  const totalOrders = sampleOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sampleOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-black/70 text-center">Receiving Orders</h1>

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-300 hidden md:table">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-black/70 font-semibold">Order Number</th>
              <th className="p-3 text-left text-black/70 font-semibold">Vendor</th>
              <th className="p-3 text-left text-black/70 font-semibold">Status</th>
              <th className="p-3 text-left text-black/70 font-semibold">Date Received</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 border-b transition duration-150">
                <td className="p-3 text-black/70">{order.orderNumber}</td>
                <td className="p-3 text-black/70">{order.vendor}</td>
                <td className="p-3 text-black/70">
                  <span className={`inline-block px-2 py-1 rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-black/70">{order.dateReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden mt-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="font-bold text-lg">Order Number: {order.orderNumber}</h2>
              <p className="text-gray-700">Vendor: {order.vendor}</p>
              <p className="text-gray-700">
                Status: <span className={`inline-block px-2 py-1 rounded-full ${getStatusBadge(order.status)}`}>{order.status}</span>
              </p>
              <p className="text-gray-700">Date Received: {order.dateReceived}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination with Next/Previous Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          className={`btn btn-sm btn-outline text-black/50 ${currentPage === 1 ? 'btn-disabled' : ''}`}
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
          className={`btn btn-sm btn-outline text-black/50 ${currentPage === totalPages ? 'btn-disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReceivingOrdersVendor;
