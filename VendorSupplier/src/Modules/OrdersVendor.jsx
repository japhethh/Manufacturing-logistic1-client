import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { useState } from "react";

// Reusable Card Component
const DashboardCard = ({ to, title, icon: Icon, badgeCount, badgeColor }) => (
  <NavLink to={to} className="w-full md:w-1/3 lg:w-1/4" aria-label={title}>
    <div className="card bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>
        <Icon className="text-3xl text-blue-600" />
      </div>
      <span
        className={`badge ${badgeColor} rounded-full px-3 py-1 text-xs font-medium`}
      >
        {badgeCount}
      </span>
    </div>
  </NavLink>
);

const OrdersVendor = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600"></div>
        </div>
      )}

      {/* Dashboard Cards */}
      <div
        className={`flex flex-col md:flex-row justify-start gap-6 mb-10 ${
          loading ? "hidden" : ""
        }`}
      >
        <DashboardCard
          to="PendingOrdersVendor"
          title="Pending Orders"
          icon={MdOutlinePendingActions}
          badgeCount={5}
          badgeColor="bg-blue-200 text-blue-800"
        />
        <DashboardCard
          to="ReceivingOrdersVendor"
          title="Receiving Orders"
          icon={GiReceiveMoney}
          badgeCount={3}
          badgeColor="bg-green-200 text-green-800"
        />
        <DashboardCard
          to="CompleteOrdersVendor"
          title="Complete Orders"
          icon={FaCalendarCheck}
          badgeCount={8}
          badgeColor="bg-yellow-200 text-yellow-800"
        />
      </div>

      {/* Outlet for Selected Component */}
      <div className={`mt-8 ${loading ? "hidden" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default OrdersVendor;
