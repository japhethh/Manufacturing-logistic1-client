import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { useState } from "react";

const OrdersVendor = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* The three cards that stay at the top */}
      <div className={`flex flex-col md:flex-row justify-start  gap-4 mb-10 ${loading ? "hidden" : ""}`}>
        <NavLink 
          to="PendingOrdersVendor" 
          className="w-full md:w-1/3 lg:w-1/4" 
          aria-label="Pending Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">Pending Orders</h2>
              <MdOutlinePendingActions className="text-3xl text-blue-600" />
            </div>
            <span className="badge bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs">5</span>
          </div>
        </NavLink>

        <NavLink 
          to="ReceivingOrdersVendor" 
          className="w-full md:w-1/3 lg:w-1/4" 
          aria-label="Receiving Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">Receiving Orders</h2>
              <GiReceiveMoney className="text-3xl text-blue-600" />
            </div>
            <span className="badge bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs">3</span>
          </div>
        </NavLink>

        <NavLink 
          to="CompleteOrdersVendor" 
          className="w-full md:w-1/3 lg:w-1/4" 
          aria-label="Complete Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">Complete Orders</h2>
              <FaCalendarCheck className="text-3xl text-blue-600" />
            </div>
            <span className="badge bg-yellow-200 text-yellow-800 rounded-full px-2 py-1 text-xs">8</span>
          </div>
        </NavLink>
      </div>

      {/* This is where the selected component will be displayed */}
      <div className={`mt-8 ${loading ? "hidden" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default OrdersVendor;
