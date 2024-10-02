import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-daisyui'; // DaisyUI pagination component

const PendingOrdersVendor = () => {
  // Sample data for pending orders (expanded for pagination demo)
  const sampleOrders = [
    { orderId: 'ORD001', vendorName: 'Vendor A', orderDate: '2024-09-30', status: 'Pending' },
    { orderId: 'ORD002', vendorName: 'Vendor B', orderDate: '2024-10-01', status: 'Pending' },
    { orderId: 'ORD003', vendorName: 'Vendor C', orderDate: '2024-10-02', status: 'Pending' },
    { orderId: 'ORD004', vendorName: 'Vendor D', orderDate: '2024-10-03', status: 'Pending' },
    { orderId: 'ORD005', vendorName: 'Vendor E', orderDate: '2024-10-04', status: 'Pending' },
    { orderId: 'ORD006', vendorName: 'Vendor F', orderDate: '2024-10-05', status: 'Pending' },
    { orderId: 'ORD007', vendorName: 'Vendor G', orderDate: '2024-10-06', status: 'Pending' },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);

  // Calculate current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sampleOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of pages
  const totalPages = Math.ceil(sampleOrders.length / ordersPerPage);

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Pending Orders</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr className="text-black/70">
              <th className="text-left">Order ID</th>
              <th className="text-left">Vendor Name</th>
              <th className="text-left">Order Date</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.orderId} className="hover">
                  <td className="py-4 px-6">{order.orderId}</td>
                  <td className="py-4 px-6">{order.vendorName}</td>
                  <td className="py-4 px-6">{order.orderDate}</td>
                  <td className="py-4 px-6">
                    <span className="badge badge-warning text-sm">{order.status}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="btn btn-sm btn-primary mr-2">View</button>
                    <button className="btn btn-sm btn-secondary">Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No pending orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          total={totalPages}
          current={currentPage}
          onClick={(page) => paginate(page)}
          display={3}
          className="btn-group"
        />
      </div>
    </div>
  );
};

export default PendingOrdersVendor;
