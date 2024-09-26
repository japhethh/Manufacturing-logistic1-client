import { FaCheck } from "react-icons/fa"; // If you're using v5 or earlier
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import DefaultLogo from "../../assets/default_logo.jpg"; // Assuming you have a default logo

const SystemSettings = () => {
  const [generalData, setGeneralData] = useState({});
  const { apiURL, token } = useContext(UserContext);
  const [image, setImage] = useState(null); // For storing the file itself
  const [imagePreview, setImagePreview] = useState(null); // For displaying preview
  const [setUp , setSetUp] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // To set the file itself
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // This will show the preview
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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

    setGeneralData(data);

    console.log(data)
    setSetUp(data.logo)

  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData(); // Create a FormData object

    formData.append("companyName", data.companyName);
    formData.append("companyEmail", data.companyEmail);
    formData.append("companyPhone", data.companyPhone);
    formData.append("defaultCurrency", data.defaultCurrency);
    formData.append("defaultCurrencyPosition", data.defaultCurrencyPosition);
    formData.append("notificationEmail", data.notificationEmail);
    formData.append("companyAddress", data.companyAddress);

    if (image) {
      formData.append("logo", image); // Attach logo file if it's available
    }

    try {
      const response = await axios.put(
        `${apiURL}/api/generalSettings/update/${Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error Detecting!", error);
    }
  };

  return (
    <div className="container mx-auto px-6 bg-white">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/documents">Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      <div className="shadow-md">
        <div className="w-full bg-blue-600 py-3 px-3">
          <h1 className="font-bold text-base-200 text-xl">General Settings</h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-5/6 bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center gap-3 max-md:flex-col">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="companyName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                    htmlFor="companyEmail"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                    htmlFor="companyPhone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyPhone"
                    placeholder="Enter your company phone"
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

              <div className="flex justify-between items-center gap-3 max-md:flex-col">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="defaultCurrency"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Default Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="defaultCurrency"
                    className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("defaultCurrency", {
                      required: "This field is required",
                    })}
                  >
                    <option disabled selected>
                      Select option
                    </option>
                    <option>PHILIPPINE PESO</option>
                    <option>USD</option>
                  </select>
                  {errors.defaultCurrency && (
                    <span className="text-red-500">
                      {errors.defaultCurrency.message}
                    </span>
                  )}
                </div>

                <div className="mb-5 flex-1">
                  <label
                    htmlFor="defaultCurrencyPosition"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Default Currency Position{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="defaultCurrencyPosition"
                    className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("defaultCurrencyPosition", {
                      required: "This field is required",
                    })}
                  >
                    <option disabled selected>
                      Select option
                    </option>
                    <option>Prefix</option>
                    <option>Suffix</option>
                  </select>
                  {errors.defaultCurrencyPosition && (
                    <span className="text-red-500">
                      {errors.defaultCurrencyPosition.message}
                    </span>
                  )}
                </div>

                <div className="mb-5 flex-1">
                  <label
                    htmlFor="notificationEmail"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Notification Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="notificationEmail"
                    placeholder="Enter your notification email"
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

              <div className="flex justify-between items-center gap-3 max-md:flex-col">
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="companyAddress"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Company Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="companyAddress"
                    rows="4"
                    placeholder="Enter your Company Address"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("companyAddress", {
                      required: "This field is required",
                    })}
                  ></textarea>
                  {errors.companyAddress && (
                    <span className="text-red-500">
                      {errors.companyAddress.message}
                    </span>
                  )}
                </div>

                <div className="mb-5 flex-1">
                <label
                  htmlFor="logo"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Company Logo <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-100">
                    <img
                      className="w-[80px] h-[80px] rounded-full object-cover"
                      src={imagePreview || setUp || DefaultLogo} // Display image preview if a new file is selected, otherwise the saved image or default
                      alt="Upload Area"
                    />
                  </span>
                  <input
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
                  type="submit"
                >
                  <FaCheck className="mr-1" />
                  Update Settings
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
