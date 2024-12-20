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
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10  transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <NavLink
          to="/trackorders"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                All Tracking Orders
              </h2>
              <AiOutlineForm className="text-4xl text-blue-500" />{" "}
              {/* New Icon */}
            </div>
            <span className="badge bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs">
              5
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/trackorders/pendings"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                Pending Tracking Orders
              </h2>
              <AiOutlineForm className="text-4xl text-blue-500" />{" "}
              {/* New Icon */}
            </div>
            <span className="badge bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs">
              5
            </span>
          </div>
        </NavLink>

        <NavLink to="" className="w-full" aria-label="Vendor Product">
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                Completed Tracking Orders
              </h2>
              <FiPackage className="text-4xl text-green-500" /> {/* New Icon */}
            </div>
            <span className="badge bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs">
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
