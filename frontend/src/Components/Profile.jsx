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
      fetchAllUsers();
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
    <div className="container-md mx-auto px-5 bg-base-200">
      <div className="py-5">
        <h1 className="font-semibold py-3 text-2xl text-gray-600">
          Hello, <span className="text-blue-600">{userData?.name}</span>
        </h1>
        <h1 className="italic font-thin">
          Change your profile information & password from here...
        </h1>
      </div>

      <div className="flex gap-5">
        <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-[#fff] rounded-md shadow-md p-5 ">
            <div className="h-46 mb-3">
              <h1 className="text-center">
                Profile Image <span className="text-red-500">*</span>
              </h1>
              <div className="flex justify-center items-center py-2  ">
                <label htmlFor="img" className="border-3">
                  <img
                    className="w-44 h-44 object-cover cursor-pointer "
                    src={userData?.image}
                    alt=""
                  />
                </label>
              </div>
              <input
                id="img"
                type="file"
                {...register("image")}
                className="hidden file-input file-input-bordered w-full"
                // Handle file change if needed
              />
            </div>

            <div className="py-2">
              {/* Contact Person */}
              <div className="mb-3">
                <label className="block mb-2">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is Required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="py-2">
              {/* Email */}
              <div className="mb-3">
                <label className="block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" // Changed to email type for validation
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is Required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="btn bg-blue-500 text-white flex justify-between items-center"
              >
                Update Profile{" "}
                <span>
                  <IoMdCheckmark />
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* Current Password */}
        <div className="bg-[#fff] rounded-md shadow-md p-5  flex-1">
          <div className="flex gap-5 ">
            {/* Password Update Section */}
            <form className="w-full" onSubmit={handleSubmit(passwordSubmit)}>
              {/* Current Password */}
              <div className="mb-3">
                <label className="block mb-2">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("currentPass", {
                    required: "Current password is required",
                  })}
                  className="input input-bordered w-full"
                  required
                />
                {errors.currentPass && (
                  <span className="text-red-500 text-sm">
                    {errors.currentPass.message}
                  </span>
                )}
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="block mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("pass", {
                    required: "New password is required",
                  })}
                  className="input input-bordered w-full"
                  required
                />
                {errors.pass && (
                  <span className="text-red-500 text-sm">
                    {errors.pass.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="block mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPass", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("pass") || "Password do not match",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.confirmPass && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPass.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-5">
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white flex justify-between items-center"
                >
                  Update Password{" "}
                  <span>
                    <IoMdCheckmark />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
