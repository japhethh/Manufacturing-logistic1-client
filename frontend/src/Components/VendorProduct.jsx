import { useEffect, useState } from "react";
import "datatables.net-dt";
import { toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "../context/Store";
import Store from "../context/Store";
import DataTable from "datatables.net-dt";
import { MdEdit } from "react-icons/md";
import VendorManagement from "./Procurements/VendorManagement";

// VendorProduct Component
const VendorProduct = () => {
  const [loading, setLoading] = useState(false);
  const [materialsData, setMaterialsData] = useState([]);
  const { token, userData, fetchUserData } = Store();
  const [selectedData, setSelectedData] = useState();
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getAllMaterialNoToken`
      );
      setMaterialsData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to fetch data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const table = new DataTable("#vendorProductTable", {
      data: materialsData,
      columns: [
        {
          title: "Image",
          data: "image",
          render: (data, type, row) =>
            `<img src="${data}" alt="${row?.materialName}" class="w-20 h-20 object-cover mx-auto" />`,
        },
        {
          title: "Category",
          data: "category",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Code",
          data: "materialCode",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Unit",
          data: "unit",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Price Per Unit",
          data: "pricePerUnit",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },

        {
          title: "Material Item",
          data: "materialName",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Quantity",
          data: "available",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: userData?.role === "superAdmin" ? "Action" : "",
          data: null,
          render: (data, type, row) => `
          <div class="flex justify-center"> 
           <button class="bg-blue-700 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${
             row._id
           }"> <i class="fas fa-eye"></i>
            </button>
          ${
            userData?.role === "superAdmin"
              ? `<button class="bg-blue-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">
              <i class="fas fa-edit"></i>
            </button>
           
            <button class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${row._id}">
              <i class="fas fa-trash-alt"></i>
            </button>`
              : ""
          }
            
          </div>
          `,
        },
      ],
      destroy: true,
      responsive: true,
      ordering: true,
      order: [[1, "desc"]],
      rowCallback: (row, data) => {
        const detailBtn = row.querySelector(`#detailBtn_${data._id}`);

        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("detail");
            setShowModal(true); // Show the modal
          });
        }
        if (userData?.role === "superAdmin") {
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);
          const updateBtn = row.querySelector(`#updateBtn_${data._id}`);

          if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
              setSelectedData(data);
              setModalType("delete");
              setShowModal(true); // Show the modal
            });
          }

          if (updateBtn) {
            updateBtn.addEventListener("click", () => {
              setSelectedData(data);
              setModalType("edit");
              setShowModal(true); // Show the modal
            });
          }
        }
      },
    });
    return () => {
      table.destroy(); // Clean up DataTable instance
    };
  }, [materialsData]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${apiURL}/api/material/deleteMaterial/${id}`
      );
      toast.info("Product deleted successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
      // toast.info(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="p-5">
      <VendorManagement />
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Vendor Product
        </h2>

        {/* Add Product Form */}
        {/* <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Quantity"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Add Product
              </button>
            </div>
          </form>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto mb-4">
          <table
            id="vendorProductTable"
            className="display cell-border stripe hover w-full text-sm text-black/80 border border-gray-300"
          ></table>
        </div>
        {/* end */}

        {/* Delete Modal */}
        {showModal && modalType === "delete" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3">
              <h3 className="text-lg font-bold font-Roboto">Vendor</h3>
              <p className="py-4 font-Roboto">
                Are you sure you want to{" "}
                <span className="text-red-500 font-bold font-Roboto">
                  delete
                </span>{" "}
                the category{" "}
                <span className="font-bold font-Roboto">
                  {selectedData?.materialName}
                </span>
                ? This action cannot be undone and will permanently remove the
                category from the system.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleDelete(selectedData._id)}
                  className="btn btn-error btn-md text-white font-Roboto"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-outline btn-error btn-md text-white font-Roboto"
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

        {/* Detail */}
        {showModal && modalType === "detail" && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-4/6">
              <div className="flex justify-center items-center">
                <img
                  className="w-20  border-4"
                  src={selectedData?.image}
                  alt={selectedData?.materialName}
                />
              </div>
              <div className="py-4 grid grid-cols-2">
                <div className="font-semibold">
                  <div className="border border-1 py-2 px-2 font-bold text-md">
                    <h1 className="font-Roboto">Vendor Name</h1>
                  </div>
                  <div className="border border-1 py-2 px-2 font-bold text-md">
                    <h1 className="font-Roboto">Vendor Code</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Material CODE</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Material Name</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Category</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Price</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Quantity</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Alert Quantity</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Tax</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">Note</h1>
                  </div>
                </div>

                <div>
                  <div className="border border-1 py-2 px-2 text-md">
                    <h1 className="font-Roboto">
                      {selectedData?.supplier?.supplierName
                        ? selectedData?.supplier?.supplierName
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2 text-md">
                    <h1 className="font-Roboto">
                      {selectedData?.supplier?.supplierCode
                        ? selectedData?.supplier?.supplierCode
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">
                      {selectedData?.materialCode
                        ? selectedData?.materialCode
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">
                      {" "}
                      {selectedData?.materialName
                        ? selectedData?.materialName
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">
                      {selectedData?.category ? selectedData?.category : "N/A"}
                    </h1>{" "}
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">
                      {selectedData?.pricePerUnit
                        ? selectedData?.pricePerUnit
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2 ">
                    <h1 className="font-Roboto">
                      {selectedData?.available
                        ? selectedData?.available
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1 className="font-Roboto">
                      {selectedData?.alertQuantity
                        ? selectedData?.alertQuantity
                        : "N/A"}
                    </h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1>{selectedData?.tax ? selectedData?.tax : "N/A"}</h1>
                  </div>
                  <div className="border border-1 py-2 px-2">
                    <h1>
                      {selectedData?.description
                        ? selectedData?.description
                        : "N/A"}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn btn-info btn-md text-white font-Roboto"
                  onClick={() => {
                    setSelectedData(null), setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProduct;
