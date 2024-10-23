import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiURL } from "../context/verifyStore";
import axios from "axios";
import verifyStore from "../context/verifyStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const EditProducts = () => {
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState([]);
  const [material, setMaterial] = useState();
  const { token } = verifyStore();

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    fetchCategory();
    fetchDataId();
  }, []);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const fetchDataId = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getSpecificMaterial/${id}`,
        { headers: { token: token } }
      );
      setMaterial(response.data.data);
      const materialOnly = response.data.data;
      console.log(materialOnly);

      setValue("alertQuantity", materialOnly.alertQuantity);
      setValue("available", materialOnly.available);
      setValue("cost", materialOnly.cost);
      setValue("image", materialOnly.image);
      setValue("materialCode", materialOnly.materialCode);
      setValue("materialName", materialOnly.materialName);
      setValue("material_id", materialOnly.material_id);
      setValue("pricePerUnit", materialOnly.pricePerUnit);
      setValue("unit", materialOnly.unit);
    } catch (error) {
      console.log(error?.response.data.message);
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

  const onSubmit = async (data) => {
    console.log({ ...data, productImage });
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
    formData.append("taxType", data.taxType);
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
    <div className="p-6 w-full bg-white rounded-lg shadow-lg">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li className="hover:underline text-blue-500 ">
            <Link to="/dashboardvendor">Home</Link>
          </li>
          <li className="hover:underline text-blue-500 ">
            <Link to="/createproduct/allproducts">All products</Link>
          </li>
          <li className="text-gray-500">Edit</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name, Code, and Category */}
        <div>
          <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-3 ">
            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                {...register("materialName", {
                  required: "Product name is required",
                })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
              />
              {errors.materialName && (
                <span className="text-red-500 text-sm">
                  {errors.materialName.message}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name=""
                id=""
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 "
                {...register("category", { required: "Category is required" })}
              >
                {category.map((item, index) => (
                  <option key={index} value={item?.category_name}>
                    {item?.category_name}
                  </option>
                ))}
              </select>

              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Barcode Symbology, Cost, Price */}

            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Cost
              </label>
              <input
                type="number"
                {...register("cost", { required: "Cost is required" })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter cost"
              />
              {errors.cost && (
                <span className="text-red-500 text-sm">
                  {errors.cost.message}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Price per Unit
              </label>
              <input
                type="number"
                {...register("pricePerUnit", { required: "Price is required" })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
              />
              {errors.pricePerUnit && (
                <span className="text-red-500 text-sm">
                  {errors.pricePerUnit.message}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                {...register("available", { required: "Quantity is required" })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter quantity"
              />
              {errors.available && (
                <span className="text-red-500 text-sm">
                  {errors.available.message}
                </span>
              )}
            </div>

            {/* Quantity, Alert Quantity, Tax %, Tax Type, and Unit */}
            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Alert Quantity
              </label>
              <input
                type="number"
                {...register("alertQuantity", {
                  required: "Alert quantity is required",
                })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter alert quantity"
              />
              {errors.alertQuantity && (
                <span className="text-red-500 text-sm">
                  {errors.alertQuantity.message}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Tax %
              </label>
              <input
                type="number"
                {...register("tax", {
                  required: "Tax percentage is required",
                })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter tax percentage"
              />
              {errors.tax && (
                <span className="text-red-500 text-sm">
                  {errors.tax.message}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px] my-2">
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>

              <select
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                name=""
                id=""
                {...register("unit", { required: "Unit is required" })}
              >
                <option value="">Select Option</option>
                <option value="pcs">Piece</option>
              </select>

              {errors.unit && (
                <span className="text-red-500 text-sm">
                  {errors.unit.message}
                </span>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="mb-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              {...register("description")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter additional notes"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input type="file" onChange={handleImageChange} className="mt-1" />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="p-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
