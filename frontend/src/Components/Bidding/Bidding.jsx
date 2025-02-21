import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
import Store from "../../context/Store";
import BiddingItems from "./BiddingItems";

const Bidding = () => {
  const { token } = Store();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState(null);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/bidding/category`, {
          headers: { token: token },
        });

        console.log(response.data);
        setCategory(response.data); // Assuming response.data is an array
      } catch (error) {
        console.log(error?.response?.data?.message || "Error fetching data");
      }
    };

    fetchCategoryData();
  }, []); // Fetch data when token changes

  // Submit Form Data
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("quantityRequired", data.quantityRequired);
      formData.append("unit", data.unit);
      formData.append("regularPrice", data.regularPrice);
      formData.append("startBiddingPrice", data.startBiddingPrice);
      formData.append("biddingEndDate", data.biddingEndDate);
      if (selectedImage) {
        formData.append("productImage", selectedImage);
      }

      const response = await axios.post(`${apiURL}/api/bidding`, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bidding item added successfully!");
      reset();
      setImagePreview(null);
      setSelectedImage(null);
    } catch (error) {
      toast.error("Failed to add bidding item!");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2">
        <BiddingItems />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Create a New Bidding Item</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
        encType="multipart/form-data"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Item Name</label>
          <input
            {...register("name", { required: "Item Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Category - Dynamic Selection */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select a Category</option>
            {category?.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium">Quantity Required</label>
          <input
            type="number"
            {...register("quantityRequired", {
              required: "Quantity is required",
              min: 1,
            })}
            className="input input-bordered w-full"
          />
          {errors.quantityRequired && (
            <p className="text-red-500 text-sm">
              {errors.quantityRequired.message}
            </p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium">Unit</label>
          <select
            {...register("unit")}
            id=""
            className="select select-bordered w-full"
          >
            <option value="">Select a unit</option>
            <option value="kg">Kg</option>
            <option value="pieces">Piece</option>
          </select>

          {errors.unit && (
            <p className="text-red-500 text-sm">{errors.unit.message}</p>
          )}
        </div>

        {/* Regular Price */}
        <div>
          <label className="block text-sm font-medium">Regular Price</label>
          <input
            type="number"
            {...register("regularPrice", {
              required: "Price is required",
              min: 0,
            })}
            className="input input-bordered w-full"
          />
          {errors.regularPrice && (
            <p className="text-red-500 text-sm">
              {errors.regularPrice.message}
            </p>
          )}
        </div>

        {/* Start Bidding Price */}
        <div>
          <label className="block text-sm font-medium">
            Start Bidding Price
          </label>
          <input
            type="number"
            {...register("startBiddingPrice", {
              required: "Bidding price is required",
              min: 0,
            })}
            className="input input-bordered w-full"
          />
          {errors.startBiddingPrice && (
            <p className="text-red-500 text-sm">
              {errors.startBiddingPrice.message}
            </p>
          )}
        </div>

        {/* Bidding End Date */}
        <div>
          <label className="block text-sm font-medium">Bidding End Date</label>
          <input
            type="date"
            {...register("biddingEndDate", {
              required: "End date is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.biddingEndDate && (
            <p className="text-red-500 text-sm">
              {errors.biddingEndDate.message}
            </p>
          )}
        </div>

        {/* Product Image Upload */}
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 w-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button type="submit" className="btn btn-primary">
            Submit Bidding
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bidding;
