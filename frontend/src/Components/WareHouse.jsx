import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Correct path
import 'tailwindcss/tailwind.css';

const WareHouse = () => {
  useEffect(() => {
    $(document).ready(function () {
      $('#inventoryTable').DataTable();
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Logistic 1 - Warehouse Management System</h1>

      {/* Inventory Management Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
        <table id="inventoryTable" className="display nowrap w-full">
          <thead>
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

      {/* Order Fulfillment Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Order Fulfillment</h2>
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <p>Manage picking, packing, and shipping operations for customer orders.</p>
          <button className="btn btn-primary mt-4">Fulfill Orders</button>
        </div>
      </div>

      {/* Shipping and Dispatch Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shipping & Dispatch</h2>
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <p>Track outgoing shipments and manage dispatch schedules.</p>
          <button className="btn btn-secondary mt-4">View Dispatches</button>
        </div>
      </div>

      {/* Reporting & Analytics Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reporting & Analytics</h2>
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <p>Generate reports and analyze warehouse operations data.</p>
          <button className="btn btn-success mt-4">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default WareHouse;
