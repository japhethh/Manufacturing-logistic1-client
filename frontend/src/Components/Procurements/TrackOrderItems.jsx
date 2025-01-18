import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai"; // New icon for Vendor Management Create
import { FiPackage } from "react-icons/fi"; // New icon for Vendor Product
import { useState } from "react";

const TrackOrderItems = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-6 pt-6 relative w-full">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Cards section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* All Tracking Orders */}
        <NavLink
          to="/trackorders"
          className="w-full"
          aria-label="All Tracking Orders"
        >
          <div className="card bg-gradient-to-tl from-sky-100 to-sky-50 shadow-md hover:shadow-lg rounded-lg p-5 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sky-900 font-bold text-lg">
                All Tracking Orders
              </h2>
              <AiOutlineForm className="text-4xl text-sky-500" />
            </div>
            <span className="badge bg-sky-200 text-sky-800 rounded-full px-3 py-1 text-sm font-medium">
              5
            </span>
          </div>
        </NavLink>

        {/* Pending Tracking Orders */}
        <NavLink
          to="/trackorders/pendings"
          className="w-full"
          aria-label="Pending Tracking Orders"
        >
          <div className="card bg-gradient-to-tl from-cyan-100 to-cyan-50 shadow-md hover:shadow-lg rounded-lg p-5 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-cyan-800 font-bold text-lg">
                Pending Orders
              </h2>
              <AiOutlineForm className="text-4xl text-cyan-800" />
            </div>
            <span className="badge bg-cyan-200 text-cyan-800 rounded-full px-3 py-1 text-sm font-medium">
              5
            </span>
          </div>
        </NavLink>

        {/* Completed Tracking Orders */}
        <NavLink
          to=""
          className="w-full"
          aria-label="Completed Tracking Orders"
        >
          <div className="card bg-gradient-to-tl from-teal-100 to-teal-50 shadow-md hover:shadow-lg rounded-lg p-5 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-teal-800 font-bold text-lg">
                Completed Orders
              </h2>
              <FiPackage className="text-4xl text-teal-800" />
            </div>
            <span className="badge bg-teal-200 text-teal-800 rounded-full px-3 py-1 text-sm font-medium">
              3
            </span>
          </div>
        </NavLink>
      </div>

      {/* Content outlet */}
      <div
        className={`mt-8 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default TrackOrderItems;
