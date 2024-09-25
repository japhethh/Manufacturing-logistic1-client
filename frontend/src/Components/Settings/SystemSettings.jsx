import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
const SystemSettings = () => {
  const [generalData, setGeneralData] = useState({});
  const { apiURL, token } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      defaultCurrency: "",
      defaultCurrencyPosition: "",
      notificationEmail: "",
      logo: "",
    },
  });

  const generalSettingsId = {
    Id: `66f1ef49f50be7fc60baedb3`,
  };

  const { Id } = generalSettingsId;

  useEffect(() => {
    fetchGeneralData();
  }, []);

  const fetchGeneralData = async () => {
    const response = await axios.get(
      `${apiURL}/api/generalSettings/getSpecificId/${Id}`,
      {
        headers: { token: token },
      }
    );
    if (!response.data.success) {
      toast.error("General Settings Not Found");
    }

    const data = response.data.data;

    setValue("companyName", data.companyName || "");
    setValue("companyEmail", data.companyEmail || "");
    setValue("companyPhone", data.companyPhone || "");
    setValue("defaultCurrency", data.defaultCurrency || "");
    setValue("defaultCurrencyPosition", data.defaultCurrencyPosition || "");
    setValue("notificationEmail", data.notificationEmail || "");
    setValue("companyAddress", data.companyAddress || "");
    setValue("logo", data.logo || "");

    setGeneralData(response.data.data);
  };

  console.log(generalData);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.put(
        `${apiURL}/api/generalSettings/update/${Id}`,
        data,
        { headers: { token: token } }
      );

      if (!response.data.success) {
        toast.error(response.data.success);
      }
      toast.success(response.data.message)
      // setGeneralData(response.data.data)
    } catch (error) {
      toast.error("Error Detecting!", error);
    }
  };
  return (
    <div className="container mx-auto px-6 ">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      <div className="shadow-md ">
        <div className="w-full bg-blue-600 py-3 px-3 ">
          <h1 className="font-bold text-base-200 text-xl">General Settings</h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-5/6 bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center gap-3">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Enter your Supplier Company"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("companyName", {
                      required: "This field is required",
                    })}
                  />
                  {errors.companyName && (
                    <span className="text-red-500">
                      {errors.companyName.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyEmail"
                    id="companyEmail"
                    placeholder="Enter your Company Email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("companyEmail", {
                      required: "This field is required",
                    })}
                  />
                  {errors.companyEmail && (
                    <span className="text-red-500">
                      {errors.companyEmail.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyPhone"
                    id="companyPhone"
                    placeholder="Enter your companyPhone"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("companyPhone", {
                      required: "This field is required",
                    })}
                  />
                  {errors.companyPhone && (
                    <span className="text-red-500">
                      {errors.companyPhone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Default Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("defaultCurrency", {
                      required: "This field is required",
                    })}
                  >
                    <option disabled selected>
                      Select option
                    </option>
                    <option>PHILIPPINE PESO</option>
                    <option>Greedo</option>
                  </select>
                  {errors.defaultCurrency && (
                    <span className="text-red-500">
                      {errors.defaultCurrency.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Default Currency Position{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("defaultCurrencyPosition", {
                      required: "This field is required",
                    })}
                  >
                    <option disabled selected>
                      Select option
                    </option>
                    <option>Prefix</option>
                    <option>Greedo</option>
                  </select>
                  {errors.defaultCurrencyPosition && (
                    <span className="text-red-500">
                      {errors.defaultCurrencyPosition.message}
                    </span>
                  )}
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Notification Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="notificationEmail"
                    id="notificationEmail"
                    placeholder="EnterYourEmail@gmail.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("notificationEmail", {
                      required: "This field is required",
                    })}
                  />
                  {errors.notificationEmail && (
                    <span className="text-red-500">
                      {errors.notificationEmail.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-5 flex-1">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Company Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  id="companyAddress"
                  placeholder="Enter your Company Address"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("companyAddress", {
                    required: "This field is required",
                  })}
                />
                {errors.companyAddress && (
                  <span className="text-red-500">
                    {errors.companyAddress.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center items-center  bg-blue-600 text-base-200 px-3  py-2"
                >
                  <span>
                    <FaCheck />
                  </span>
                  <h1>Create Employee</h1>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
