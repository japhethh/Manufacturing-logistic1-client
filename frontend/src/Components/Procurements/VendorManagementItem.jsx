import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai"; // New icon for Vendor Management Create
import { FiPackage } from "react-icons/fi"; // New icon for Vendor Product
import { BsFolderX } from "react-icons/bs"; // New icon for Empty
import { useState } from "react";
import { getCountProducts, getCountVendor } from "../../queries/ProductQueries";
import { useQuery, useMutation, useQueryClient } from "react-query";

const VendorManagementItem = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: productItems,
    isLoading: productLoading,
    error: productError,
    isError: productIsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getCountProducts,
  });
  const {
    data: vendorItems,
    isError: vendorIsError,
    error: vendorError,
    isLoading: vendorIsLoading,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getCountVendor,
  });

  console.log(vendorItems);

  const totalProducts =
    productItems && productItems[0] ? productItems[0]?.totalProducts : 0;

  const totalVendors =
    vendorItems && vendorItems[0] ? vendorItems[0]?.totalVendors : 0;

  if (productLoading || vendorIsLoading) {
    return (
      <div>
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  if (productIsError || vendorIsError) {
    console.error("Error fetching data", productError || vendorError);
    return (
      <div>
        <h1>There error please try again</h1>
      </div>
    );
  }

  return (
    <div className="px-6 pt-6 relative">
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
        <NavLink
          to="/vendormanagement"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-800 font-bold text-xl font-Roboto">
                All
              </h2>
              <AiOutlineForm className="text-4xl text-blue-500" />
            </div>
            <span className="badge bg-blue-200 text-blue-900 font-bold font-Roboto rounded-full px-3 py-3 text-md">
              5
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/vendorproduct"
          className="w-full"
          aria-label="Vendor Product"
        >
          <div className="card bg-gradient-to-br from-green-50 to-green-100 font-Roboto shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-green-800 font-bold text-xl font-Roboto">
                Vendor Products
              </h2>
              <FiPackage className="text-4xl text-green-500" />
            </div>
            <span className="badge bg-green-200 text-green-800 font-bold font-Roboto rounded-full px-3 py-3 text-md">
              {totalProducts}
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/vendormanagementcreate"
          className="w-full"
          aria-label="Create Vendor"
        >
          <div className="card bg-gradient-to-br from-purple-50 to bg-purple-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-purple-800 font-bold text-xl font-Roboto">
                Vendors
              </h2>
              <AiOutlineForm className="text-4xl text-purple-500" />
            </div>
            <span className="badge bg-purple-200 text-purple-800 font-bold font-Roboto rounded-full px-3 py-3 text-md">
              {totalVendors}
            </span>
          </div>
        </NavLink>

        {/* EMPTY CARDS CLOSE */}

        {/* <NavLink to="/empty" className="w-full" aria-label="Empty">
          <div className="card bg-white shadow-lg rounded-lg p-6 text-center transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 font-semibold text-lg">Empty</h2>
              <BsFolderX className="text-4xl text-yellow-500" />
            </div>
            <span className="badge bg-yellow-200 text-yellow-800 rounded-full px-2 py-1 text-xs">
              8
            </span>
          </div>
        </NavLink> */}
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

export default VendorManagementItem;
