import React, { useState } from 'react';

const PendingOrdersVendor = () => {
  const sampleOrders = [
    { orderId: 'ORD001', vendorName: 'Vendor A', orderDate: '2024-09-30', status: 'Pending' },
    { orderId: 'ORD002', vendorName: 'Vendor B', orderDate: '2024-10-01', status: 'Pending' },
    { orderId: 'ORD003', vendorName: 'Vendor C', orderDate: '2024-10-02', status: 'Pending' },
    { orderId: 'ORD004', vendorName: 'Vendor D', orderDate: '2024-10-03', status: 'Pending' },
    { orderId: 'ORD005', vendorName: 'Vendor E', orderDate: '2024-10-04', status: 'Pending' },
    { orderId: 'ORD006', vendorName: 'Vendor F', orderDate: '2024-10-05', status: 'Pending' },
    { orderId: 'ORD007', vendorName: 'Vendor G', orderDate: '2024-10-06', status: 'Pending' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sampleOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(sampleOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Pending Orders</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full shadow-lg rounded-lg">
          <thead className="bg-gray-200 border-b-2 border-gray-300">
            <tr className="text-gray-600">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Vendor Name</th>
              <th className="text-left py-3 px-4">Order Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-100 hover:text-black/70 transition-all duration-200 ease-in-out rounded-md text-black/70"
                >
                  <td className="py-4 px-6 border-b">{order.orderId}</td>
                  <td className="py-4 px-6 border-b">{order.vendorName}</td>
                  <td className="py-4 px-6 border-b">{order.orderDate}</td>
                  <td className="py-4 px-6 border-b">
                    <span className="badge badge-warning text-sm px-2 py-1 rounded-md bg-yellow-300 text-gray-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b flex">
                    <button className="btn btn-sm btn-primary mr-2 transition-transform transform hover:scale-105">
                      View
                    </button>
                    <button className="btn btn-sm btn-secondary transition-transform transform hover:scale-105">
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination with Next/Previous Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          className={`btn btn-sm btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
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
          className={`btn btn-sm btn-outline text-black/50 border-blue-500 hover:bg-blue-400 ${currentPage === totalPages ? 'btn-disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingOrdersVendor;
