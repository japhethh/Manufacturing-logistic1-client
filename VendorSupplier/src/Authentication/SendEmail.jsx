// src/components/VendorRegistrationForm.jsx

import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VendorUserContext } from "../context/VendorUserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";

// Define the validation schema using Zod
const schema = z.object({
  supplierName: z.string().min(1, "Company Name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"]).optional(),
  email: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Phone number is required"),
});

const VendorRegistrationForm = () => {
  const { apiURL } = useContext(VendorUserContext);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      supplierName: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      contactPhone: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {

    console.log(data)
    const templateParams = {
      supplierName: data.supplierName,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      email: data.email,
      contactPhone: data.contactPhone,
    };

    try {
      const response = await axios.post(
        `${apiURL}/api/email/register-supplier`,
        data
      );

      if (response.status === 200) {
        console.log("Email sent successfully!", response.data);
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        reset(); // Reset the form after successful submission
      } else {
        throw new Error(response.data.error || "Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex items-center py-5 justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Vendor Registration
        </h2>

        {/* Supplier Name */}
        <div className="mb-4">
          <label
            htmlFor="supplierName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
          Company Name
          </label>
          <input
            type="text"
            id="supplierName"
            placeholder="Enter company name"
            {...register("supplierName")}
            className={`mt-1 block w-full p-3 border ${
              errors.supplierName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
          />
          {errors.supplierName && (
            <p className="text-xs text-red-500">
              {errors.supplierName.message}
            </p>
          )}
            <p className="text-xs text-gray-500">
              Name of the company the vendor represents.
            </p>
        </div>

        {/* First and Last Name */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName")}
              className={`mt-1 block w-full p-3 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
            {!errors.firstName && (
              <p className="text-xs text-gray-500">Vendor's first name.</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              {...register("lastName")}
              className={`mt-1 block w-full p-3 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
            {!errors.lastName && (
              <p className="text-xs text-gray-500">Vendor's last name.</p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className={`mt-1 block w-full p-3 border ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
          >
            <option value="">Select your gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender.message}</p>
          )}
          {!errors.gender && (
            <p className="text-xs text-gray-500">Vendor's gender (optional).</p>
          )}
        </div>

        {/* Email Address */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Sample@gmail.com"
            {...register("email")}
            className={`mt-1 block w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
          {!errors.email && (
            <p className="text-xs text-gray-500">
              Vendor's email address for communication and verification.
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="contactPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="contactPhone"
            placeholder="+63 999-9999-999"
            {...register("contactPhone")}
            className={`mt-1 block w-full p-3 border ${
              errors.contactPhone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200`}
          />
          {errors.contactPhone && (
            <p className="text-xs text-red-500">
              {errors.contactPhone.message}
            </p>
          )}
          {!errors.contactPhone && (
            <p className="text-xs text-gray-500">
              Contact number for further communication.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
        >
          Register
        </button>

        {/* Link to Login */}
        <NavLink to="/">
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline ml-1">
              Log in
            </a>
          </p>
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default VendorRegistrationForm;
