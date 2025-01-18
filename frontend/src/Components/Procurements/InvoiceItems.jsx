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
    <div className="px-6 pt-6  relative w-full">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* CARDS SELECTION */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <NavLink to="/invoice/all" className="w-full" aria-label="All Invoice">
          <div className="card bg-gradient-to-br from-blue-100 to blue-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-blue-800 font-bold text-lg sm:text-xl">
                All Invoice
              </h2>
              <AiOutlineForm className="text-4xl sm:text-5xl text-blue-500 transition-transform transform hover:scale-110" />
            </div>
            <span className="badge bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
              {allResult}
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/pending"
          className="w-full"
          aria-label="Pending Invoice"
        >
          <div className="card bg-gradient-to-br from-teal-100 to-teal-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-teal-800 font-bold text-lg sm:text-xl">
                Pending Invoice
              </h2>
              <AiOutlineForm className="text-4xl sm:text-5xl text-teal-500 transition-transform transform hover:scale-110" />
            </div>
            <span className="badge bg-gradient-to-r from-teal-300 to-teal-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
              {pendingResult}
            </span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/complete"
          className="w-full"
          aria-label="Complete Invoice"
        >
          <div className="card bg-gradient-to-br from-green-100 to-green-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-green-800 font-bold text-lg sm:text-xl">
                Complete Invoice
              </h2>
              <FiPackage className="text-4xl sm:text-5xl text-green-500 transition-transform transform hover:scale-110" />
            </div>
            <span className="badge bg-gradient-to-r from-green-300 to-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
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
