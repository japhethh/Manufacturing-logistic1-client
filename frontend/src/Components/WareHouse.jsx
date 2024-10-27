import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "tailwindcss/tailwind.css";
import { NavLink } from "react-router-dom";

const SmallBusinessWarehouse = () => {
  useEffect(() => {
    $(document).ready(function () {
      $("#inventoryTable").DataTable();
    });
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
        Warehouse Management
      </h1>

      {/* Navigation Buttons */}
      <div className="flex justify-around mb-12 space-x-4">
        <NavLink to="/fulfillorders">
          <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">Order Fulfillment</span>
            <p className="text-sm mt-2 text-center">
              Manage picking, packing, and shipping operations
            </p>
          </div>
        </NavLink>
        <NavLink to="/dispatches">
          <div className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">Shipping & Dispatch</span>
            <p className="text-sm mt-2 text-center">
              Track outgoing shipments and manage dispatch schedules
            </p>
          </div>
        </NavLink>
        <NavLink to="/report">
          <div className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">Reporting & Analytics</span>
            <p className="text-sm mt-2 text-center">
              Generate reports and analyze warehouse data
            </p>
          </div>
        </NavLink>
        <NavLink to="/receiving">
          <div className="bg-amber-500 hover:bg-amber-700 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">Receiving</span>
            <p className="text-sm mt-2 text-center">
              Generate Receiving and analyze warehouse data
            </p>
          </div>
        </NavLink>
      </div>

      {/* Basic Inventory Management Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold mb-8 text-left drop-shadow-lg">
          Products Stats
        </h1>
        <div className="overflow-x-auto">
          <table
            id="inventoryTable"
            className="display nowrap w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg text-black shadow-lg"
          >
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
    </div>
  );
};

export default SmallBusinessWarehouse;
