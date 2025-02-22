import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";
import { VendorUserContext } from "../context/VendorUserContext";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaBars, FaTimes } from "react-icons/fa";
import vendor from "../assets/vendorLogin.jpg";
import { FcExpired } from "react-icons/fc";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { setToken } = useContext(VendorUserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiURL}/api/supplier/login`, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboardvendor");
      document.getElementById("login_modal").close(); // Close modal on success
      window.location.reload();
    } catch (error) {
      reset();
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  const categories = [
    "All",
    "Appliances",
    "Category 102",
    "Desktop Computers",
    "Laptop",
    "Mobile Phone",
    "Sample Category",
  ];

  const products = [
    {
      id: 1,
      name: "Sample Prod 23",
      category: "Category 102",
      description: "Sample Only",
      image:
        "https://i5.walmartimages.com/seo/HP-Stream-14-Laptop-Intel-Celeron-N4000-4GB-SDRAM-32GB-eMMC-Office-365-1-yr-Royal-Blue_4f941fe6-0cf3-42af-a06c-7532138492fc_2.cb8e85270e731cb1ef85d431e49f0bf2.jpeg",
      date: "1 Feb 2025, 10:10 PM",
    },
    {
      id: 2,
      name: "Dell Inspiron",
      category: "Laptop",
      description: "Powerful Dell Laptop",
      image:
        "https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/inspiron-14-7000-laptop-black.png",
      date: "3 Feb 2025, 8:30 AM",
    },
    {
      id: 3,
      name: "Samsung Galaxy S23",
      category: "Mobile Phone",
      description: "Latest Samsung Mobile",
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/levant/2202/gallery/levant-galaxy-s22-ultra-s908-412842-sm-s908ezwgmea-thumb-530338599?$320_320_PNG$",
      date: "5 Feb 2025, 2:15 PM",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-56 w-full relative">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">
              <NavLink
                to="/login"
                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-200"
              >
                Vendor Portal
              </NavLink>
            </a>
          </div>
          <div className="navbar-end">
            {/* Button to Open Modal */}
            <button
              className="btn btn-primary hover:bg-blue-700 transition duration-200"
              onClick={() => document.getElementById("login_modal").showModal()}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Background Image */}
      <img
        src={vendor}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
        style={{ zIndex: -1 }}
      />

      {/* Login Modal */}
      <dialog id="login_modal" className="modal">
        <div className="modal-box w-full max-w-md bg-white rounded-lg shadow-xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
            LOGIN
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-5 relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password")}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Close Button */}
          <div className="modal-action mt-4">
            <button
              className="btn btn-ghost hover:bg-gray-100 transition duration-200"
              onClick={() => document.getElementById("login_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Main Content */}
      <div className="flex w-full px-6 py-8 gap-6 z-10">
        {/* Categories Sidebar */}
        <div className="w-1/4 h-96 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer transition duration-200 ${
                  selectedCategory === category
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Display */}
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
          <div className="overflow-auto h-96">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative flex items-center gap-6 p-5 bg-gray-50 rounded-lg shadow transition duration-300 hover:shadow-xl"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex flex-col flex-1">
                      {/* Expiration Date */}
                      <span className="flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1 rounded-full w-fit">
                        <FcExpired className="text-lg" />
                        {product.date}
                      </span>

                      {/* Product Name */}
                      <h1 className="text-lg font-semibold text-gray-900 mt-2">
                        {product.name}
                      </h1>

                      {/* Category */}
                      <span className="text-xs text-gray-700 font-medium bg-gray-200 px-2 py-1 rounded-md w-fit">
                        {product.category}
                      </span>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      {/* DaisyUI Dropdown */}
                      <div className="dropdown mt-3">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn w-24 bg-blue-500 text-white font-bold hover:bg-blue-600"
                        >
                          View
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu shadow bg-white border rounded-lg w-44 p-2"
                        >
                          <li>
                            <a>Item 1</a>
                          </li>
                          <li>
                            <a>Item 2</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No products found in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Component */}
      <div className={`drawer ${selectedProduct ? "drawer-open" : ""}`}>
        <input
          type="checkbox"
          id="my-drawer"
          className="drawer-toggle"
          checked={!!selectedProduct}
          onChange={() => setSelectedProduct(null)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={() => setSelectedProduct(null)}
          ></label>
          <div className="p-6 w-80 bg-white shadow-lg min-h-full">
            {selectedProduct && (
              <>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                  {selectedProduct.name}
                </h2>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded-lg shadow-md my-4"
                />
                <p className="text-gray-700">
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
                <p className="text-gray-700">
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <p className="text-gray-700">
                  <strong>Available Since:</strong> {selectedProduct.date}
                </p>
                <button
                  className="btn mt-4 w-full bg-red-500 hover:bg-red-600 text-white transition duration-200"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
