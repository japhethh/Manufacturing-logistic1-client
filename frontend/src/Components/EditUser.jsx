import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Store from '../context/Store'
const EditUser = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const {token} = Store();

  if (!context) {
    return null;
  }
  const { apiURL } = context;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/user/getEdit/${id}`);
        const userData = response.data;
        // Set form values with fetched data
        setValue("name", userData?.name);
        setValue("phone", userData?.phone);
        setValue("email", userData?.email);
        setValue("userName", userData?.userName);
        setValue("role", userData?.role);
      } catch (error) {
        toast.error("Failed to fetch user data.");
      }
    };
    if (id) fetchUserData();
  }, [id, apiURL, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data };

      // Exclude password if it's not changed
      if (!data.password) {
        delete payload.password;
      }

      const response = await axios.put(
        `${apiURL}/api/user/update/${id}`,
        payload,
      {headers:{token:token}}
    );
      toast.success("Updated Successfully");
      navigate("/user");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="breadcrumbs text-sm mb-5">
          <ul>
            <li>
              <Link to="/user">Users</Link>
            </li>
            <li>
              <a>Edit User</a>
            </li>
          </ul>
        </div>

        <div className="p-2 shadow-md">
          <div className="border-b-2 my-2">
            <div>
              <button className="px-4 text-sm rounded-full bg-blue-700 text-white mb-2 flex justify-between items-center gap-2 py-3 font-semibold">
                <h1>Edit User</h1>
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
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base-400 font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                    htmlFor="userName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Enter your Username"
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
                    htmlFor="password"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter new password (leave blank to keep current)"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("password")}
                  />
                </div>
              </div>

              <div className="md:flex md:justify-between md:items-center md:gap-3">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="role"
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
                    <option value="pending">Pending</option>
                  </select>
                  {errors.role && (
                    <span className="text-red-500">{errors.role.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
