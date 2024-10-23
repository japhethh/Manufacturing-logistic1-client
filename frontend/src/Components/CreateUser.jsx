import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    return null;
  }
  const { apiURL } = context;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`${apiURL}/api/user/register`, data);
      toast.success("Created Successfully", response.data.data.name);
      navigate("/user");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };
  return (
    <div className="container mx-auto px-4 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="breadcrumbs text-sm mb-5">
          <ul>
            <li>
              <Link to="/user">Users</Link>
            </li>
            <li>
              <a>Create User</a>
            </li>
          </ul>
        </div>

        <div className="p-2 shadow-md ">
          <div className="border-b-2 my-2">
            <div>
              <button className="px-4 text-sm rounded-full bg-blue-700 text-white mb-2 flex justify-between items-center gap-2 py-3 font-semibold">
                <h1>Create Employee</h1>{" "}
                <span>
                  <FaCheck />
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-5/6 bg-white">
              <div className="md:flex md:justify-between md:items-center md:gap-3">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("name", { required: "Full name is Required" })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("phone", { required: "Phone is Required" })}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="md:flex md:justify-between md:items-center md:gap-3">
                <div className="mb-5 flex-1 ">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("email", { required: "Email is Required" })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Enter your Username "
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("userName", {
                      required: "Username is Required",
                    })}
                  />
                  {errors.userName && (
                    <span className="text-red-500">
                      {errors.userName.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("password", {
                      required: "Password is Required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2 ">
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      {...register("date", {
                        required: "date is Required",
                      })}
                    />
                    {errors.date && (
                      <span className="text-red-500">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/2 ">
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      id="role"
                      {...register("role", { required: "Role is required" })}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option value="" disabled selected>
                        Select
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {errors.role && (
                    <span className="text-red-500">{errors.role.message}</span>
                  )}
                </div>
              </div>

              <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter address"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        {...register("address", {
                          required: "date is Required",
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter city"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        {...register("city", {
                          required: "City is Required",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
