import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdBallot } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // INSTANTLY OPEN CATEGORY SECTION
  useEffect(() => {
    if (location.pathname === "/createproduct") {
      navigate("category");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* 4 CARDS */}
      <div
        className={`flex flex-col md:flex-row justify-start gap-4 mb-10 ${
          loading ? "hidden" : ""
        }`}
      >
        <NavLink
          to="category"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Category"
        >
          <div className="card bg-gradient-to-l from-cyan-50 to-cyan-100 shadow-md rounded-lg p-5 h-32 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-cyan-800 font-bold text-xl font-Roboto">
              Category
            </h2>
            <MdCategory className="text-4xl text-cyan-700 self-end" />
          </div>
        </NavLink>

        <NavLink
          to="products"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Create Product"
        >
          <div className="card bg-gradient-to-l from-blue-50 to-blue-100 shadow-md rounded-lg p-5 h-32 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-blue-800 font-bold text-xl font-Roboto">
              Create Product
            </h2>
            <IoIosCreate className="text-4xl text-blue-700 self-end" />
          </div>
        </NavLink>

        <NavLink
          to="allproducts"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="All Products"
        >
          <div className="card bg-gradient-to-l from-purple-50 to-purple-100 shadow-md rounded-lg p-5 h-32 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-purple-800 font-bold text-xl font-Roboto">
              All Products
            </h2>
            <MdBallot className="text-4xl text-purple-700 self-end" />
          </div>
        </NavLink>

        {/* <NavLink
          to="printproducts"
          className="w-full md:w-1/3 lg:w-1/4"
          aria-label="Print Barcode"
        >
          <div className="card bg-gradient-to-l from-fuchsia-50 to-fuchsia-100 shadow-md rounded-lg p-5 h-32 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-fuchsia-800 font-bold text-xl font-Roboto">
              Print Barcode
            </h2>
            <FaPrint className="text-4xl text-fuchsia-700 self-end" />
          </div>
        </NavLink> */}
      </div>

      {/* Display Selected Component */}
      <div className={`mt-8 ${loading ? "hidden" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default CreateProduct;
