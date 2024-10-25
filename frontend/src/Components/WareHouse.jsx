import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'tailwindcss/tailwind.css';

const SmallBusinessWarehouse = () => {
  useEffect(() => {
    $(document).ready(function () {
      $('#inventoryTable').DataTable();
    });
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">Small Business Warehouse</h1>

      {/* Basic Inventory Management Section */}
      <div className="mb-12">
        <div className="overflow-x-auto">
          <table id="inventoryTable" className="display nowrap w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg text-black shadow-lg">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th>Item Code</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Electronics</td>
                <td>100</td>
                <td>Warehouse A</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>002</td>
                <td>Furniture</td>
                <td>50</td>
                <td>Warehouse B</td>
                <td>Low Stock</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Order Fulfillment Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Order Fulfillment</h2>
        <div className="shadow-lg p-6 rounded-lg bg-gray-100 text-gray-800">
          <p className="text-center">Manage picking, packing, and shipping operations for customer orders.</p>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">Fulfill Orders</button>
          </div>
        </div>
      </div>

      {/* Shipping and Dispatch Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-center">Shipping & Dispatch</h2>
        <div className="shadow-lg p-6 rounded-lg bg-gray-100 text-gray-800">
          <p className="text-center">Track outgoing shipments and manage dispatch schedules.</p>
          <div className="flex justify-center mt-4">
            <button className="btn btn-secondary px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">View Dispatches</button>
          </div>
        </div>
      </div>

      {/* Basic Reporting Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Reporting & Analytics</h2>
        <div className="shadow-lg p-6 rounded-lg bg-gray-100 text-gray-800">
          <p className="text-center">Generate reports and analyze warehouse operations data.</p>
          <div className="flex justify-center mt-4">
            <button className="btn btn-success px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBusinessWarehouse;
