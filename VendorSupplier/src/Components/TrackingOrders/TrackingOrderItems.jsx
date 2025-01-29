import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { MdOutlineSpatialTracking } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdTrackChanges } from "react-icons/md";
import { useState } from "react";

const TrackingOrderItems = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* CARDS SECTIONS */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10  transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <NavLink
          to="/trackingOrders"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-tl from-teal-200 to-teal-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-teal-800 font-bold text-xl">
                All Tracking Orders
              </h2>
              <AiOutlineForm className="text-4xl text-teal-700" />{" "}
            </div>
            <span className="badge bg-gradient-to-br from-teal-400 via-teal-300 to-teal-100 text-teal-900 font-bold rounded-full px-3 py-2 text-lg">
              5
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/trackingOrders/pending"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-tl from-cyan-200 to-cyan-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-cyan-800 font-bold text-xl">
                Pending Tracking Orders
              </h2>
              <MdOutlinePendingActions className="text-4xl text-cyan-700" />{" "}
            </div>
            <span className="badge bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-100 text-cyan-900 font-bold rounded-full px-3 py-2 text-lg">
              5
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/trackingOrders/dispatch"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-tl from-sky-200 to-sky-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sky-800 font-bold text-xl">
                Dispatch Tracking Orders
              </h2>
              <MdOutlineSpatialTracking className="text-4xl text-sky-700" />{" "}
            </div>
            <span className="badge bg-gradient-to-br from-sky-400 via-sky-300 to-sky-100 text-sky-900 font-bold rounded-full px-3 py-2 text-lg">
              5
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/trackingOrders/In_Transit"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-tl from-blue-200 to-blue-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-800 font-bold text-xl">
                In Transit Tracking Orders
              </h2>
              <MdTrackChanges className="text-4xl text-blue-700" />{" "}
            </div>
            <span className="badge bg-gradient-to-br from-blue-400 via-blue-300 to-blue-100 text-blue-900 font-bold rounded-full px-3 py-2 text-lg">
              5
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/trackingOrders/delivered"
          className="w-full"
          aria-label="Vendor Product"
        >
          <div className="card bg-gradient-to-tl from-indigo-200 to-indigo-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-indigo-800 font-bold text-xl">
                Delivered Tracking Orders
              </h2>
              <FiPackage className="text-4xl text-indigo-700" />
            </div>
            <span className="badge bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-100 text-indigo-900 font-bold rounded-full px-3 py-2 text-lg">
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

export default TrackingOrderItems;
