import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../context/verifyStore";

const OrdersVendor = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600"></div>
        </div>
      )}

      <div
        className={`flex flex-col md:flex-row justify-start gap-6 mb-10 ${
          loading ? "hidden" : ""
        }`}
      >
        <NavLink
          to="PendingOrdersVendor"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Pending Orders"
        >
          <div className="card bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-yellow-700 font-bold text-xl">
                Pending Orders
              </h2>
              <MdOutlinePendingActions className="text-3xl text-yellow-600" />
            </div>
            <span className="badge bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-bold">
              5
            </span>
          </div>
        </NavLink>

        <NavLink
          to="ReceivingOrdersVendor"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Receiving Orders"
        >
          <div className="card bg-gradient-to-tr from-blue-100 to-blue-50 shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-800 font-bold text-xl">
                Receiving Orders
              </h2>
              <GiReceiveMoney className="text-3xl text-blue-600" />
            </div>
            <span className="badge bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-medium">
              3
            </span>
          </div>
        </NavLink>

        <NavLink
          to="CompleteOrdersVendor"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Completed Orders"
        >
          <div className="card bg-gradient-to-tr from-green-100 to-green-50 shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-green-800 font-bold text-xl">
                Completed Orders
              </h2>
              <FaCalendarCheck className="text-3xl text-green-600" />
            </div>
            <span className="badge bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
              8
            </span>
          </div>
        </NavLink>

        <NavLink
          to="RejectedOrdersVendor"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Rejected Orders"
        >
          <div className="card bg-gradient-to-tr from-red-100 to-red-50 shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-red-800 font-bold text-xl">
                Rejected Orders
              </h2>
              <FaCalendarCheck className="text-3xl text-red-600" />
            </div>
            <span className="badge bg-red-500 text-white rounded-full px-3 py-1 text-xs font-medium">
              8
            </span>
          </div>
        </NavLink>
      </div>

      <div className={`mt-8 ${loading ? "hidden" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default OrdersVendor;
