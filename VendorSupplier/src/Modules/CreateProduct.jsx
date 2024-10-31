import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdBallot } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";


const CreateProduct = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* The four cards that stay at the top */}
      <div
        className={`flex flex-col md:flex-row justify-start gap-4 mb-10 ${
          loading ? "hidden" : ""
        }`}
      >
        <NavLink
          to="category"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Pending Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">Category</h2>
              <MdCategory className="text-3xl text-blue-600" />
            </div>
          </div>
        </NavLink>

        <NavLink
          to="products"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Receiving Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">
                Create Product
              </h2>
              <IoIosCreate className="text-3xl text-blue-600" />
            </div>
          </div>
        </NavLink>

        <NavLink
          to="allproducts"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Complete Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">
                All Products
              </h2>
              <MdBallot className="text-3xl text-blue-600" />
            </div>
          </div>
        </NavLink>

        <NavLink
          to="printproducts"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Complete Orders"
        >
          <div className="card bg-white shadow-lg rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 font-semibold text-lg">
                Print Barcode
              </h2>
              <FaPrint className="text-3xl text-blue-600" />
            </div>
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

export default CreateProduct;
