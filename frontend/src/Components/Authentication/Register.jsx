import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 py-2">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col items-center">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-3">
          Sign Up for Logistic 1
        </h1>
        <form className="w-full flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm mt-3"
          >
            Register
          </button>
        </form>

        <div className="mt-3 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
