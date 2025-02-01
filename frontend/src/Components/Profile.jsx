import axios from "axios";
import { IoMdCheckmark } from "react-icons/io";
import { apiURL } from "../context/Store";
import Store from "../context/Store";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState(null); // Initialize as null or an empty object
  const { userData, token, fetchAllUsers } = Store();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset(userData); // Reset form with fetched data
    }
  }, [userData, reset]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const onSubmit = async (data) => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.name);

    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    console.log(formData);
    try {
      const response = await axios.put(
        `${apiURL}/api/user/update/${data._id}`,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);

      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response.data.message);
    }
    // Add your API call here to update the user profile
  };

  const passwordSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `${apiURL}/api/user/updatePassword/${data._id}`,
        data
      );

      console.log(response.data.message);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className="container-md mx-auto px-5 bg-base-200 min-h-screen">
    <div className="py-8">
      <h1 className="font-semibold py-3 text-3xl text-gray-700">
        Hello, <span className="text-blue-600">{userData?.name}</span>
      </h1>
      <h1 className="italic font-light text-gray-500">
        Change your profile information & password from here...
      </h1>
    </div>
  
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Profile Update Section */}
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="mb-6">
            <h1 className="text-center text-xl font-medium text-gray-700">
              Profile Image <span className="text-red-500">*</span>
            </h1>
            <div className="flex justify-center items-center py-4">
              <label htmlFor="img" className="cursor-pointer">
                <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-blue-100 hover:border-blue-200 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={userData?.image}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </div>
              </label>
            </div>
            <input
              id="img"
              type="file"
              {...register("image")}
              className="hidden"
            />
          </div>
  
          <div className="space-y-4">
            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("name", { required: "Name is Required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("email", { required: "Email is Required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
  
          <div className="pt-6">
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 text-white w-full flex justify-center items-center gap-2 transition-all"
            >
              Update Profile
              <IoMdCheckmark className="text-lg" />
            </button>
          </div>
        </div>
      </form>
  
      {/* Password Update Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1">
        <form onSubmit={handleSubmit(passwordSubmit)}>
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("currentPass", {
                  required: "Current password is required",
                })}
              />
              {errors.currentPass && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.currentPass.message}
                </span>
              )}
            </div>
  
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("pass", {
                  required: "New password is required",
                })}
              />
              {errors.pass && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.pass.message}
                </span>
              )}
            </div>
  
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("confirmPass", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("pass") || "Passwords do not match",
                })}
              />
              {errors.confirmPass && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirmPass.message}
                </span>
              )}
            </div>
          </div>
  
          <div className="pt-6">
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 text-white w-full flex justify-center items-center gap-2 transition-all"
            >
              Update Password
              <IoMdCheckmark className="text-lg" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Profile;
