import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";
import { VendorUserContext } from "../context/VendorUserContext";
import { useContext } from "react";
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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${apiURL}/api/supplier/login`, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      reset();
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    // component

    <div className="flex items-center px-4 sm:px-56 w-full min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
        {/* Login */}
        <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-900">
            LOGIN
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
              <a
                href="#"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:outline-none"
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
                  className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </a>
              </NavLink>
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>

        {/* Text */}
        <div className="text-center sm:text-left mt-8 sm:mt-0">
          <p className="text-5xl sm:text-7xl font-bold text-black">
            Vendor Portal
          </p>
          <p className="text-black/70 mt-4 text-base sm:text-lg font-medium">
            Sign in to access your account and manage your preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
