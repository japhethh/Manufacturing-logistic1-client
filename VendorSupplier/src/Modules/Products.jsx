import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import verifyStore from "../context/verifyStore";
import { toast } from "react-toastify";
const Products = () => {
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState([]);
  const { token } = verifyStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/category/`, {
        headers: { token: token },
      });
      setCategory(response.data.data);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  // console.log(category);
  // console.log(productImage);

  const onSubmit = async (data) => {
    console.log({ ...data, productImage });
    console.log(data);
    const formData = new FormData();
    // Append the form data values
    formData.append("materialName", data.materialName);
    formData.append("category", data.category);
    // formData.append("barcodeSymbology", data.barcodeSymbology);
    formData.append("cost", parseFloat(data.cost));
    formData.append("pricePerUnit", parseFloat(data.pricePerUnit));
    formData.append("available", parseInt(data.available, 10));
    formData.append("alertQuantity", parseInt(data.alertQuantity, 10));
    formData.append("taxPercentage", parseFloat(data.taxPercentage));
    formData.append("tax", data.tax);
    formData.append("unit", data.unit);
    formData.append("note", data.note);
    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      const response = await axios.put(
        `${apiURL}/api/material/appendMaterial`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      // Handle successful submission
      toast.success(response.data.message);
      reset();
    } catch (error) {
      // Handle errors
      toast.error(error?.response.data.message);
    }
  };

  // const handleImageChanges = (e) => {
  //   const file = e.target.files[0];
  //   setProductImage(file); // To set the file itself
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result); // This will show the preview
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="p-8 w-full  mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 font-Roboto mb-6 tracking-wide">
        Create Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Product Name
            </label>
            <input
              type="text"
              {...register("materialName", {
                required: "Product name is required",
              })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter product name"
            />
            {errors.materialName && (
              <span className="text-red-500 font-Roboto text-sm">
                {errors.materialName.message}
              </span>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Category
            </label>
            <select
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              {...register("category", { required: "Category is required" })}
            >
              {category.map((item, index) => (
                <option key={index} value={item?._id}>
                  {item?.category_name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Cost
            </label>
            <input
              type="number"
              {...register("cost", { required: "Cost is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter cost"
            />
            {errors.cost && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.cost.message}
              </span>
            )}
          </div>

          {/* Price per Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Price per Unit
            </label>
            <input
              type="number"
              {...register("pricePerUnit", { required: "Price is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter price"
            />
            {errors.pricePerUnit && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.pricePerUnit.message}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Quantity
            </label>
            <input
              type="number"
              {...register("available", { required: "Quantity is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter quantity"
            />
            {errors.available && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.available.message}
              </span>
            )}
          </div>

          {/* Alert Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Alert Quantity
            </label>
            <input
              type="number"
              {...register("alertQuantity", {
                required: "Alert quantity is required",
              })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter alert quantity"
            />
            {errors.alertQuantity && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.alertQuantity.message}
              </span>
            )}
          </div>

          {/* Tax % */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Tax %
            </label>
            <input
              type="number"
              {...register("tax", { required: "Tax percentage is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              placeholder="Enter tax percentage"
            />
            {errors.tax && (
              <span className="text-red-500 text-sm font-Roboto">{errors.tax.message}</span>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 font-Roboto">
              Unit
            </label>
            <select
              className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
              {...register("unit", { required: "Unit is required" })}
            >
              <option value="" className="font-Roboto">Select Option</option>
              <option value="pcs" className="font-Roboto">Piece</option>
            </select>
            {errors.unit && (
              <span className="text-red-500 text-sm font-Roboto">
                {errors.unit.message}
              </span>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-600 font-Roboto">
            Note
          </label>
          <textarea
            {...register("description")}
            className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
            placeholder="Enter additional notes"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-600 font-Roboto">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2 block w-full text-gray-700 bg-gray-100 border border-gray-300 rounded-xl p-3 cursor-pointer transition hover:bg-gray-200 shadow-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-36 h-36 rounded-xl object-cover border border-gray-300 shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full p-4 text-lg font-bold text-white font-Roboto bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Products;
