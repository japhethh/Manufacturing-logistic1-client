import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiURL } from "../context/verifyStore";
import Select from "react-select";

const AllProducts = () => {
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all materials
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/material/getAllMaterial`);
      setRequestData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for updating material
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!selectedData) {
      toast.error("No data selected.");
      return;
    }

    try {
      await axios.put(
        `${apiURL}/api/material/updateMaterial/${selectedData._id}`,
        selectedData
      );
      toast.success("Product updated successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      // Close the modal by unchecking the checkbox
      document.getElementById("my_modal_6").checked = false;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed.");
    }
  };

  // Handle deletion of material
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/api/material/deleteMaterial/${id}`);
      toast.info("Product deleted successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      // Close the modal by unchecking the checkbox
      document.getElementById("my_modal_7").checked = false;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  // Handle category change using react-select
  const handleCategoryChange = (selectedOption) => {
    setSelectedData((prevData) => ({
      ...prevData,
      category: selectedOption.value,
    }));
  };

  // Handle input changes for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Display loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Images</th>
              <th className="border border-gray-300 p-2">Material Code</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Material Name</th>
              {/* <th className="border border-gray-300 p-2">Cost</th> */}
              <th className="border border-gray-300 p-2">Price Per Unit</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.materialCode}</td>
                <td className="border border-gray-300 p-2">{product.category}</td>
                <td className="border border-gray-300 p-2">{product.materialName}</td>
                <td className="border border-gray-300 p-2">{product.pricePerUnit}</td>
                <td className="border border-gray-300 p-2">{product.unit}</td>
                <td className="border border-gray-300 p-2">{product.available}</td>
                <td className="border border-gray-300 p-2">{product.description}</td>

                <td className="border border-gray-300 p-2">
                  <label
                    htmlFor="my_modal_6"
                    className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1 cursor-pointer"
                    onClick={() => setSelectedData(product)}
                  >
                    Edit
                  </label>
                  <label
                    htmlFor="my_modal_7"
                    className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-lg mx-1 cursor-pointer"
                    onClick={() => setSelectedData(product)}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold">{selectedData?.materialCode}</h3>
          <form onSubmit={onSubmit}>
            <div className="text-center font-semibold text-2xl py-4">
              <h1>Update Product</h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Material Category */}
              <div>
                <label className="block mb-2">
                  Material Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={{
                    value: selectedData?.category,
                    label: selectedData?.category,
                  }}
                  onChange={handleCategoryChange}
                  options={[
                    ...new Map(
                      requestData.map((item) => [item.category, item.category])
                    ).values(),
                  ].map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  className="w-full max-w-xs"
                  placeholder="Select category"
                />
              </div>

              {/* Material Code */}
              <div>
                <label className="block mb-2">
                  Material Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="materialCode"
                  id="materialCode"
                  placeholder="Enter Material Code"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.materialCode || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Material Name */}
              <div>
                <label className="block mb-2">
                  Material Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="materialName"
                  id="materialName"
                  placeholder="Enter Material Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.materialName || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Price Per Unit */}
              <div>
                <label className="block mb-2">
                  Price Per Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  id="pricePerUnit"
                  placeholder="Enter Price Per Unit"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.pricePerUnit || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="available"
                  id="available"
                  placeholder="Enter Quantity"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.available || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Alert Quantity */}
              <div>
                <label className="block mb-2">
                  Alert Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="alertQuantity"
                  id="alertQuantity"
                  placeholder="Enter Alert Quantity"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.alertQuantity || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Tax */}
              <div>
                <label className="block mb-2">
                  Tax (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="tax"
                  id="tax"
                  placeholder="Enter Tax"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.tax || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="unit"
                  id="unit"
                  placeholder="Enter Unit"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.unit || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Empty divs for grid alignment */}
              <div></div>
              <div></div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              <div>
                <label className="block mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter Description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedData?.description || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              <div>
                <label className="block mb-2">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={(e) => {
                    // Handle file upload if necessary
                    const file = e.target.files[0];
                    setSelectedData((prevData) => ({
                      ...prevData,
                      image: file,
                    }));
                  }}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-5 mt-4">
              <div className="modal-action">
                <button type="submit" className="btn btn-success text-white">
                  Save
                </button>
              </div>
              <div className="modal-action">
                <label
                  htmlFor="my_modal_6"
                  className="btn"
                  onClick={() => setSelectedData(null)} // Reset selectedData on close
                >
                  Close!
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{selectedData?.materialCode}</h3>
          <p className="py-4">
            Are you sure you want to{" "}
            <span className="text-red-500 font-bold">delete</span> the product{" "}
            <span className="font-bold">{selectedData?.materialName}</span>?
            This action cannot be undone and will permanently remove the product
            from the system.
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => handleDelete(selectedData.id)}
              className="btn btn-error btn-md text-white"
            >
              Confirm
            </button>

            <label
              htmlFor="my_modal_7"
              className="btn btn-outline btn-error btn-md text-white"
              onClick={() => setSelectedData(null)} // Reset selectedData on cancel
            >
              Cancel
            </label>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AllProducts;
