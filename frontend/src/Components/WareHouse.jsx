import { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "tailwindcss/tailwind.css";
import { NavLink } from "react-router-dom";
import { FaBox, FaTruck, FaChartBar, FaInbox } from "react-icons/fa";

const SmallBusinessWarehouse = () => {
  useEffect(() => {
    $(document).ready(function () {
      $("#inventoryTable").DataTable();
    });
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-4xl font-extrabold font-Roboto mb-8 text-center drop-shadow-lg">
        Warehouse Management
      </h1>

      {/* CARDS NAVIGATION BUTTONS */}
      <div className="flex flex-wrap justify-center sm:justify-between mb-12 gap-6">
        {/* Order Fulfillment */}
        <NavLink to="/fulfillorders" className="w-full sm:w-auto">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-[Roboto] rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center relative">
            <FaBox
              className="absolute top-4 left-4 text-white opacity-80"
              size={24}
            />
            <span className="text-xl font-bold">Order Fulfillment</span>
            <p className="text-sm mt-2 text-center">
              Manage picking, packing, and shipping operations
            </p>
          </div>
        </NavLink>

        {/* Shipping & Dispatch */}
        <NavLink to="/dispatches" className="w-full sm:w-auto">
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white font-[Roboto] rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center relative">
            <FaTruck
              className="absolute top-4 left-4 text-white opacity-80"
              size={24}
            />
            <span className="text-xl font-bold">Shipping & Dispatch</span>
            <p className="text-sm mt-2 text-center">
              Track outgoing shipments and manage dispatch schedules
            </p>
          </div>
        </NavLink>

        {/* Reporting & Analytics */}
        <NavLink to="/report" className="w-full sm:w-auto">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-[Roboto] rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center relative">
            <FaChartBar
              className="absolute top-4 left-4 text-white opacity-80"
              size={24}
            />
            <span className="text-xl font-bold">Reporting & Analytics</span>
            <p className="text-sm mt-2 text-center">
              Generate reports and analyze warehouse data
            </p>
          </div>
        </NavLink>

        {/* Receiving */}
        <NavLink to="/receiving" className="w-full sm:w-auto">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white font-[Roboto] rounded-xl shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center justify-center relative">
            <FaInbox
              className="absolute top-4 left-4 text-white opacity-80"
              size={24}
            />
            <span className="text-xl font-bold">Receiving</span>
            <p className="text-sm mt-2 text-center">
              Generate Receiving and analyze warehouse data
            </p>
          </div>
        </NavLink>
      </div>

      {/* Basic Inventory Management Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold font-Roboto mb-8 text-left drop-shadow-lg">
          Products Stats
        </h1>
        <div className="overflow-x-auto">
          <table
            id="inventoryTable"
            className="display nowrap w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg text-black shadow-lg"
          >
            <thead className="bg-indigo-500 text-white font-Roboto">
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
