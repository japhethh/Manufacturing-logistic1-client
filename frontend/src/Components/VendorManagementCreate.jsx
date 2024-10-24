import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import { apiURL } from "../context/Store";
import store from "../context/Store";
import axios from "axios";
import { toast } from "react-toastify";
import VendorManagement from "./Procurements/VendorManagement";
// VendorManagementCreate Component
const VendorManagementCreate = () => {
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = store();
  const [selectedData, setSelectedData] = useState();
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false); // Declare showModal state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setSuppliersData(response.data);
      console.log(response.data);
      // setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
      console.log(error?.response?.data?.message);
      // setLoading(false);
    }
  };

  useEffect(() => {
    const table = new DataTable("#supplierTable", {
      data: suppliersData,
      columns: [
        {
          title: "Supplier Code",
          data: "supplierCode",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "First Name",
          data: "firstName",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Last Name",
          data: "lastName",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Supplier Name",
          data: "supplierName",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Email",
          data: "email",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Contact Phone",
          data: "contactPhone",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Rating",
          data: "rating",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Status",
          data: "status",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Update At",
          data: "updatedAt",
          render: (data) => (data ? data : "N/A"),
        },

        {
          title: "Actions",
          data: null,
          render: (data, type, row) => `
          
            <div className="flex flex-col gap-2"> 
              <label htmlFor="my_modal_5" class="bg-blue-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="viewBtn_${row._id}">View</label>
              <label htmlFor="my_modal_6" class="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">Edit</label>
              <label htmlFor="my_modal_7" class="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${row._id}">Delete</label>
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
        const viewBtn = row.querySelector(`#viewBtn_${data._id}`);

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
        if (viewBtn) {
          viewBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("view");
            setShowModal(true); // Show the modal
          });
        }
      },
    });
    return () => {
      table.destroy(); // Clean up DataTable instance
    };
  }, [suppliersData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedData) {
      toast.error("No data selected.");
      return;
    }

    try {
      await axios.put(`${apiURL}/api/supplier/addsuppliers/`, selectedData);
      toast.success("Supplier Added successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Added failed.");
    }
  };
  const handleEdit = async (id) => {
    console.log(selectedData);

    if (!selectedData) {
      toast.error("No data selected.");
      return;
    }

    try {
      await axios.put(
        `${apiURL}/api/supplier/updateSupplier/${id}`,
        selectedData
      );
      toast.success("Supplier updated successfully!");
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
      const response = await axios.delete(
        `${apiURL}/api/supplier/delete/${id}`
      );
      toast.info("Supplier deleted successfully!");
      fetchData(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  // Handle input changes for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div>
          <h1 className="text-black font-bold text-5xl">Loading</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <VendorManagement />

      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Vendor Management Create
        </h2>
        {/* Add Vendor Form */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Vendor Name"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
              <input
                type="email"
                placeholder="Vendor Email"
                className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Vendor Address"
              className="input w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
              >
                Add Vendor
              </button>
            </div>
          </form>
        </div>
        {/* Vendor Data Table */}
        <div className="divider"></div>
        <div className="overflow-x-scroll mx-auto ">
          <table id="supplierTable" className="display w-full "></table>
        </div>
        {/* Delete Modal */}
        {showModal && modalType === "delete" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3">
              <h3 className="text-lg font-bold">Vendor</h3>
              <p className="py-4">
                Are you sure you want to{" "}
                <span className="text-red-500 font-bold">delete</span> the
                category{" "}
                <span className="font-bold">{selectedData?.supplierName}</span>?
                This action cannot be undone and will permanently remove the
                category from the system.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleDelete(selectedData._id)}
                  className="btn btn-error btn-md text-white"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-outline btn-error btn-md text-white"
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
        {showModal && modalType === "edit" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-4/6">
              <h3>Vendor Edit</h3>
              <div>
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Supplier Code */}
                    <div>
                      <label className="block mb-2">
                        Supplier Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="supplierCode"
                        value={
                          selectedData?.supplierCode
                            ? selectedData?.supplierCode
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>

                    {/* Supplier Name */}
                    <div>
                      <label className="block mb-2">
                        Supplier Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="supplierName"
                        value={
                          selectedData?.supplierName
                            ? selectedData?.supplierName
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={
                          selectedData?.contactPerson
                            ? selectedData?.contactPerson
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Contact Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactEmail"
                        value={
                          selectedData?.contactEmail
                            ? selectedData?.contactEmail
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPhone"
                        value={
                          selectedData?.contactPhone
                            ? selectedData?.contactPhone
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="gender"
                        value={
                          selectedData?.gender ? selectedData?.gender : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={
                          selectedData?.address?.city
                            ? selectedData?.address?.city
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={
                          selectedData?.address?.country
                            ? selectedData?.address?.country
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={
                          selectedData?.address?.address
                            ? selectedData?.address?.address
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Payment Term <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="paymentTerms"
                        value={
                          selectedData?.paymentTerms
                            ? selectedData?.paymentTerms
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div>
                      <label className="block mb-2">
                        Company Website <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyWebsite"
                        value={
                          selectedData?.companyWebsite
                            ? selectedData?.companyWebsite
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleEdit(selectedData._id)}
                  className="btn btn-info btn-md text-white"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-outline btn-error btn-md text-white"
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
        {/* Modal */}
        {showModal && modalType === "view" && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supplier-modal-title"
          >
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-3/4 overflow-y-auto">
              {/* Supplier Info Card */}
              <div>
                <h2
                  id="supplier-modal-title"
                  className="text-2xl font-bold mb-4 text-gray-900"
                >
                  Supplier Information
                </h2>

                {/* Supplier Name and Code */}
                <div className="mb-6">
                  <p className="font-semibold">
                    Supplier Name:{" "}
                    <span className="text-gray-700">
                      {selectedData?.supplierName}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Supplier Code:{" "}
                    <span className="text-gray-700">
                      {selectedData?.supplierCode}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 ">
                <div>
                  {/* Contact Information */}
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900">
                    Contact Information
                  </h3>
                  <div className="mb-6">
                    <p className="font-semibold">
                      Contact Person:{" "}
                      <span className="text-gray-700">
                        {selectedData?.contactPerson}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Contact Email:{" "}
                      <span className="text-gray-700">
                        {selectedData?.email}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Contact Phone:{" "}
                      <span className="text-gray-700">
                        {selectedData?.contactPhone}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {/* Address */}
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900">
                    Address
                  </h3>
                  <div className="mb-6">
                    <p className="font-semibold">
                      Street:{" "}
                      <span className="text-gray-700">
                        {selectedData?.address?.street}
                      </span>
                    </p>
                    <p className="font-semibold">
                      City:{" "}
                      <span className="text-gray-700">
                        {selectedData?.address?.city}
                      </span>
                    </p>
                    <p className="font-semibold">
                      State:{" "}
                      <span className="text-gray-700">
                        {selectedData?.address?.state}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Country:{" "}
                      <span className="text-gray-700">
                        {selectedData?.address?.country}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Zip Code:{" "}
                      <span className="text-gray-700">
                        {selectedData?.address?.zipCode}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {/* Additional Information */}
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900">
                    Additional Information
                  </h3>
                  <div className="mb-6">
                    <p className="font-semibold">
                      Company Website:{" "}
                      <span className="text-gray-700">
                        {selectedData?.companyWebsite || "Not Provided"}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Payment Terms:{" "}
                      <span className="text-gray-700">
                        {selectedData?.paymentTerms}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Rating:{" "}
                      <span className="text-gray-700">
                        {selectedData?.rating || "N/A"}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Status:{" "}
                      <span className="text-gray-700">
                        {selectedData?.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {/* Account Information */}
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900">
                    Account Information
                  </h3>
                  <div className="mb-6">
                    <p className="font-semibold">
                      Email:{" "}
                      <span className="text-gray-700">
                        {selectedData?.contactEmail}
                      </span>
                    </p>
                    <p className="font-semibold">
                      First Name:{" "}
                      <span className="text-gray-700">
                        {selectedData?.firstName}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Last Name:{" "}
                      <span className="text-gray-700">
                        {selectedData?.lastName}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Gender:{" "}
                      <span className="text-gray-700">
                        {selectedData?.gender}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {/* Timestamps */}
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900">
                    Timestamps
                  </h3>
                  <div className="mb-6 pb-5">
                    <p className="font-semibold">
                      Created At:{" "}
                      <span className="text-gray-700">
                        {selectedData?.createdAt}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Updated At:{" "}
                      <span className="text-gray-700">
                        {selectedData?.updatedAt}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="btn btn-outline btn-error btn-md text-white"
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
    </div>
  );
};

export default VendorManagementCreate;
