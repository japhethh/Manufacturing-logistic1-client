import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";
import { VendorUserContext } from "../context/VendorUserContext";
import { useContext, useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaBars, FaTimes } from "react-icons/fa";
import vendor from "../assets/vendorLogin.jpg";
import { FcExpired } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { token, setToken } = useContext(VendorUserContext);
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
  const [loginSource, setLoginSource] = useState("navbar");
  const [biddingData, setBiddingData] = useState([]); // State to store bidding data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch bidding data from the backend
  useEffect(() => {
    const fetchBiddingData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/bidding`, {
          headers: { token: token }, // Include token for authorization
        });
        setBiddingData(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching bidding data:", error);
        toast.error("Failed to fetch bidding data");
        setLoading(false);
      }
    };

    fetchBiddingData();
  }, [token]); // Add token as a dependency

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiURL}/api/supplier/login`, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token); // Update token in context

      // Redirect based on login source
      if (loginSource === "navbar") {
        navigate("/dashboardvendor");
      } else {
        document.getElementById("login_modal").close(); // Close modal on success
      }

      // Reset login source after successful login
      setLoginSource("navbar"); // Reset to default
      window.location.reload();
    } catch (error) {
      reset();
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  const handlePlaceBid = () => {
    if (!token) {
      setLoginSource("placeBid");
      document.getElementById("login_modal").showModal();
      toast.info("Please login to place a bid.", {
        position: "top-center",
      });
    } else {
      toast.success("You can now place a bid!", {
        position: "top-center",
      });
      // Add your bid placement logic here
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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? biddingData
      : biddingData.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>; // Display loading state
  }

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
            <button
              className="btn btn-primary hover:bg-blue-700 transition duration-200"
              onClick={() => {
                setLoginSource("navbar");
                document.getElementById("login_modal").showModal();
              }}
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
          <h1 className="mb-2 text-3xl font-bold text-center text-gray-900">
            Welcome Back
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Please login to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password")}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

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

      {/* MAIN CONTENT */}
      {/* PLACE BIDDING */}
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
                    key={product._id} // Use _id from the backend
                    className="relative flex items-center gap-6 p-5 bg-gray-50 rounded-lg shadow transition duration-300 hover:shadow-xl"
                  >
                    <img
                      src={product.productImage} // Use productImage from the backend
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex flex-col flex-1">
                      <span className="flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1 rounded-full w-fit">
                        <FcExpired className="text-lg" />
                        {new Date(product.biddingEndDate).toLocaleString()} // Format date
                      </span>
                      <h1 className="text-lg font-semibold text-gray-900 mt-2">
                        {product.name}
                      </h1>
                      <span className="text-xs text-gray-700 font-medium bg-gray-200 px-2 py-1 rounded-md w-fit">
                        {product.category}
                      </span>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      <button
                        className="btn bg-blue-500 text-white font-bold font-Roboto hover:bg-blue-600 mt-5"
                        onClick={() =>
                          document.getElementById(`my_modal_${product._id}`).showModal()
                        }
                      >
                        View
                      </button>
                      <dialog id={`my_modal_${product._id}`} className="modal">
                        <div className="modal-box bg-white rounded-xl shadow-lg p-6 relative">
                          <form method="dialog">
                            <button className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-gray-600 hover:bg-gray-200 z-10">
                              <IoClose className="text-2xl" />
                            </button>
                          </form>

                          <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img
                              src={product.productImage}
                              alt="Product"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="mt-4 text-gray-800">
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Category:{" "}
                              <span className="text-blue-500 font-medium">
                                {product.category}
                              </span>
                            </p>

                            <div className="mt-3 space-y-2">
                              <p className="text-gray-700">
                                <strong>Starting Amount:</strong>{" "}
                                <span className="text-blue-600 font-semibold">
                                  ₱{product.startBiddingPrice}
                                </span>
                              </p>
                              <p className="text-gray-700">
                                <strong>Until:</strong>{" "}
                                <span className="text-red-500 font-medium">
                                  {new Date(product.biddingEndDate).toLocaleString()}
                                </span>
                              </p>
                              <p className="text-gray-700">
                                <strong>Highest Bid:</strong>{" "}
                                <span className="text-green-500 font-semibold">
                                  ₱{product.bids.length > 0 ? Math.max(...product.bids.map(bid => bid.bidAmount)) : "No bids yet"}
                                </span>
                              </p>
                            </div>

                            <p className="text-gray-500 italic mt-3">
                              {product.description}
                            </p>
                          </div>

                          <button
                            className="btn btn-primary w-full mt-5 py-3 text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-blue-600"
                            onClick={handlePlaceBid}
                          >
                            Place a Bid
                          </button>
                        </div>
                      </dialog>
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
    </div>
  );
};

export default Login;