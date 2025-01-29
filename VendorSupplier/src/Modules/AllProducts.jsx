import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiURL } from "../context/verifyStore";
import Select from "react-select";
import verifyStore from "../context/verifyStore";
import DataTable from "datatables.net-dt"; // Import DataTable
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { token } = verifyStore();
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false); // Declare showModal state
  const navigate = useNavigate();
  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all materials
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getAllMaterial`,
        { headers: { token: token } }
      );
      setRequestData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize DataTable
  useEffect(() => {
    if (requestData.length > 0) {
      const table = new DataTable("#productsTable", {
        data: requestData,
        columns: [
          {
            title: "Image",
            data: "image",
            render: (data, type, row) =>
              `<img src="${data}" alt="${row?.materialName}" class="w-20 h-20 object-cover mx-auto" />`,
          },
          {
            title: "CODE",
            data: "materialCode",
            render: (data) => (data ? data : "N/A"),
          },
          {
            title: "Material Name",
            data: "materialName",
            render: (data) => (data ? data : "N/A"),
          },
          {
            title: "Cost",
            data: "cost",
            render: (data) => (data ? data : "N/A"),
          },
          {
            title: "Price",
            data: "pricePerUnit",
            render: (data) => (data ? data : "N/A"),
          },
          {
            title: "Category",
            data: null,
            render: (data) =>
              data?.category?.category_name
                ? data?.category?.category_name
                : "N/A",
          },
          {
            title: "Quantity",
            data: "available",
            render: (data) => (data ? data : "N/A"),
          },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => `
              <div className="flex gap-2"> 
                <label htmlFor="my_modal_6" class="bg-blue-600 hover:bg-blue-700 duration-200 font-medium text-white px-4 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">Edit</label>
                <label htmlFor="my_modal_7" class="border border-red-600 text-red-600 hover:bg-red-600 font-medium hover:text-white duration-200 px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${row._id}">Delete</label>
              </div>
            `,
          },
        ],
        destroy: true,
        paging: true,
        searching: true,
        ordering: true,
        order: [[1, "desc"]],
        rowCallback: (row, data) => {
          // Attach event listeners
          const updateBtn = row.querySelector(`#updateBtn_${data._id}`);
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);

          if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
              setSelectedData(data);
              setModalType("delete");
              setShowModal(true); // Show the modal
            });
          }

          if (updateBtn) {
            updateBtn.addEventListener("click", () => {
              navigate(`/products/${data?._id}/edit`);
              setSelectedData(data);
              setModalType("edit");
              setShowModal(true); // Show the modal
            });
          }
        },
      });

      return () => {
        table.destroy(); // Clean up DataTable instance
      };
    }
  }, [requestData]); // Only run when requestData changes

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
        selectedData,
        {
          headers: { token: token },
        }
      );
      toast.success("Product updated successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed.");
    }
  };

  // Handle deletion of material
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/api/material/deleteMaterial/${id}`, {
        headers: { token: token },
      });
      toast.info("Product deleted successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
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
    <div className="container mx-auto mt-8 bg-white p-10 rounded-md">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
        All Products
      </h1>

      <div className="border-b-2 border-gray-300 mb-6"></div>

      <table
        id="productsTable"
        className="display w-full border rounded-lg overflow-hidden shadow-md"
      >
        <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-lg">
          {/* Table Headers Here */}
        </thead>
      </table>

      {/* Edit Modal */}
      {showModal && modalType === "edit" && selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl transition-all scale-105">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedData?.materialCode}
            </h3>
            <form onSubmit={onSubmit}>
              <div className="text-center font-semibold text-2xl py-5 text-blue-700">
                Update Product
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Material Category */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
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
                        requestData.map((item) => [
                          item.category,
                          item.category,
                        ])
                      ),
                    ]
                      .values()
                      .map((cat) => ({
                        value: cat,
                        label: cat,
                      }))}
                    className="w-full"
                    placeholder="Select category"
                  />
                </div>

                {/* Material Code */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
                    Material Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="materialCode"
                    value={selectedData?.materialCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
                    required
                  />
                </div>

                {/* Material Name */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
                    Material Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="materialName"
                    value={selectedData?.materialName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {/* Price Per Unit */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
                    Price Per Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={selectedData?.pricePerUnit}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
                    required
                  />
                </div>

                {/* Alert Quantity */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
                    Alert Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="alertQuantity"
                    value={selectedData?.alertQuantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-600 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={selectedData?.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400/50 transition shadow-sm"
                  ></textarea>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end mt-6 gap-4">
                <button className="px-5 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition">
                  Save
                </button>
                <button
                  className="px-5 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-400 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showModal && modalType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transition-all scale-105">
            <h3 className="text-xl font-bold text-red-600">
              {selectedData?.materialCode}
            </h3>
            <p className="text-gray-700 py-4">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold">delete</span> the product{" "}
              <span className="font-bold">{selectedData?.materialName}</span>?
              This action is{" "}
              <span className="font-bold text-red-500">permanent</span>.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleDelete(selectedData._id)}
                className="px-5 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition"
              >
                Confirm
              </button>
              <button
                className="px-5 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-400 transition"
                onClick={() => {
                  setSelectedData(null); // Reset selectedData on cancel
                  setShowModal(false); // Close modal
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
