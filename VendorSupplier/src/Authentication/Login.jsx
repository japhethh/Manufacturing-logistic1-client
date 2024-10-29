import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";
import { VendorUserContext } from "../context/VendorUserContext";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    reset 
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { 
      email: "", 
      password: "" 
    },
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${apiURL}/api/supplier/login`, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboardvendor");
      window.location.reload();
    } catch (error) {
      reset();
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row items-center px-4 sm:px-56 w-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
      <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
        {/* Login */}
        <div className="max-w-md w-full px-10 py-8 bg-white rounded-xl shadow-2xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
            LOGIN
          </h1>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                {...register("password")}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
              <a
                href="#"
                className="text-xs text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                  defaultChecked
                />
                <label
                  htmlFor="remember"
                  className="block ml-2 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <NavLink to="/sendemail">
                <a
                  href="#"
                  className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Account
                </a>
              </NavLink>
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
        {/* Text */}
        <div className="text-center sm:text-left mt-8 sm:mt-0">
          <p className="text-6xl sm:text-7xl font-bold text-white">
            Vendor Portal
          </p>
          <p className="text-white/80 mt-4 text-base sm:text-lg font-medium">
            Sign in to access your account and manage your preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
