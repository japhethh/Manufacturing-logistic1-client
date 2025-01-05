import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai"; // New icon for Vendor Management Create
import { FiPackage } from "react-icons/fi"; // New icon for Vendor Product
import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";

import {
  pendingInvoice,
  approvedInvoice,
  allInvoice,
} from "../../queries/InvoiceQueries";
const InvoiceItems = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: pendingData,
    error: pendingError,
    isError,
    isLoading: pendingLoading,
  } = useQuery({ queryKey: ["pendingInvoice"], queryFn: pendingInvoice });

  const {
    data: approveData,
    error: approveError,
    isLoading: approveLoading,
  } = useQuery({ queryKey: ["approvedInvoice"], queryFn: approvedInvoice });

  const {
    data: allData,
    error: allError,
    isLoading: allLoading,
  } = useQuery({ queryKey: ["allInvoice"], queryFn: allInvoice });

  const pendingResult =
    pendingData && pendingData[0]?.count ? pendingData[0]?.count : 0;

  const approveResult =
    approveData && approveData[0]?.count ? approveData[0]?.count : 0;

  const allResult = allData && allData[0]?.count ? allData[0]?.count : 0;

  console.log(pendingResult);
  console.log(approveResult);
  console.log(allResult);

  if (pendingLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div>
        <h1 className="text-center font-semibold text-xl">
          There's an Error please try again
        </h1>
      </div>
    );
  }

  return (
    <div className="px-6 pt-6  bg-gradient-to-b from-gray-100 to-gray-50 relative w-full">
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
          to="/invoice/all"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                All Invoice
              </h2>
              <AiOutlineForm className="text-4xl text-blue-500" />{" "}
              {/* New Icon */}
            </div>
            <span className="badge bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs">
              {allResult}
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/pending"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                Pending Invoice
              </h2>
              <AiOutlineForm className="text-4xl text-blue-500" />{" "}
              {/* New Icon */}
            </div>
            <span className="badge bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs">
              {pendingResult}
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/complete"
          className="w-full"
          aria-label="Vendor Product"
        >
          <div className="card bg-white shadow-lg rounded-lg p-3 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">
                Complete Invoice
              </h2>
              <FiPackage className="text-4xl text-green-500" /> {/* New Icon */}
            </div>
            <span className="badge bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs">
              {approveResult}
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

export default InvoiceItems;
