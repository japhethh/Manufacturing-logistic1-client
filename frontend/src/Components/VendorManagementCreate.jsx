import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import { apiURL } from "../context/Store";
import Store from "../context/Store";
import axios from "axios";
import { toast } from "react-toastify";
import VendorManagement from "./Procurements/VendorManagement";
// VendorManagementCreate Component
const VendorManagementCreate = () => {
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token, userData, fetchUserData } = Store();
  const [selectedData, setSelectedData] = useState();
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false); // Declare showModal state
  const isSuperAdmin = userData?.role === "superAdmin";
  useEffect(() => {
    fetchData();
    fetchUserData();
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
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "First Name",
          data: "firstName",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Last Name",
          data: "lastName",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Supplier Name",
          data: "supplierName",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Email",
          data: "email",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Contact Phone",
          data: "contactPhone",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Rating",
          data: "rating",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Status",
          data: "status",
          render: (data) =>
            data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`,
        },
        {
          title: "Updated At",
          data: "updatedAt",
          render: (data) =>
            data
              ? new Date(data).toLocaleString()
              : `<div class="text-red-500">N/A</div>`,
        },
        {
          title: isSuperAdmin ? "Actions" : "",
          data: null,
          render: (data, type, row) => `
            <div class="flex flex-row gap-1">
            <button
                id="viewBtn_${
                  row._id
                }" class="bg-blue-700 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer"
                aria-label="View Supplier"
              >
                <i class="fas fa-eye"></i>
              </button>
            ${
              isSuperAdmin
                ? `
              <button
                id="updateBtn_${row._id}"
                class="bg-blue-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer"
                aria-label="Edit Supplier"
              >
                              <i class="fas fa-edit"></i>

              </button>
              <button
                id="deleteBtn_${row._id}"
                class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer"
                aria-label="Delete Supplier"
              >
                <i class="fas fa-trash-alt"></i>
              </button>`
                : ""
            }
              
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
        const viewBtn = row.querySelector(`#viewBtn_${data._id}`);

        if (viewBtn) {
          viewBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("view");
            setShowModal(true);
          });
        }

        if (isSuperAdmin) {
          const updateBtn = row.querySelector(`#updateBtn_${data._id}`);
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);

          if (updateBtn) {
            updateBtn.addEventListener("click", () => {
              setSelectedData(data);
              setModalType("edit");
              setShowModal(true);
            });
          }

          if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
              setSelectedData(data);
              setModalType("delete");
              setShowModal(true);
            });
          }
        }
      },
    });

    return () => {
      table.destroy();
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
          <h1 className="text-black font-bold text-5xl font-Roboto">Loading</h1>
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
        {/* <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
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
        </div> */}
        {/* Vendor Data Table */}
        <div className="divider"></div>
        <div className="overflow-x-scroll mx-auto ">
          <table id="supplierTable" className="display w-full "></table>
        </div>
        {/* Delete Modal */}
        {showModal && modalType === "delete" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3">
              <h3 className="text-lg font-bold font-Roboto">Vendor</h3>
              <p className="py-4 font-Roboto">
                Are you sure you want to{" "}
                <span className="text-red-500 font-Roboto font-bold">
                  delete
                </span>{" "}
                the category{" "}
                <span className="font-bold font-Roboto">
                  {selectedData?.supplierName}
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
        {showModal && modalType === "edit" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-4/6">
              <h3 className="font-Roboto">Vendor Edit</h3>
              <div>
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Supplier Code */}
                    <div>
                      <label className="block mb-2">
                        Supplier Code{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Supplier Name{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Contact Person{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Contact Email{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Contact Phone{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Gender{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        City <span className="text-red-500 font-Roboto">*</span>
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
                        Country{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Address{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Payment Term{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                        Company Website{" "}
                        <span className="text-red-500 font-Roboto">*</span>
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
                  className="btn btn-info btn-md text-white font-Roboto"
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
        {/* Modal */}
        {showModal && modalType === "view" && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supplier-modal-title"
          >
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-3/4 overflow-y-auto">
              {/* Supplier Info Header */}
              <div>
                <h2
                  id="supplier-modal-title"
                  className="text-2xl font-bold mb-6 text-gray-900 font-Roboto"
                >
                  Supplier Information
                </h2>
                {/* Supplier Name and Code */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <p className="text-lg font-medium text-gray-800 font-Roboto">
                    Supplier Name:{" "}
                    <span className="text-gray-600 font-normal">
                      {selectedData?.supplierName || "Not Provided"}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Supplier Code:{" "}
                    <span className="text-gray-600 font-normal">
                      {selectedData?.supplierCode || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-Roboto">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Contact Person:
                      </span>{" "}
                      {selectedData?.contactPerson || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Contact Email:
                      </span>{" "}
                      {selectedData?.email || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Contact Phone:
                      </span>{" "}
                      {selectedData?.contactPhone || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-Roboto">
                    Address
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Street:</span>{" "}
                      {selectedData?.address?.street || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">City:</span>{" "}
                      {selectedData?.address?.city || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">State:</span>{" "}
                      {selectedData?.address?.state || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Country:</span>{" "}
                      {selectedData?.address?.country || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Zip Code:</span>{" "}
                      {selectedData?.address?.zipCode || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-Roboto">
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Company Website:
                      </span>{" "}
                      {selectedData?.companyWebsite || "Not Provided"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Payment Terms:
                      </span>{" "}
                      {selectedData?.paymentTerms || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Rating:</span>{" "}
                      {selectedData?.rating || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Status:</span>{" "}
                      {selectedData?.status || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-Roboto">
                    Account Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Email:</span>{" "}
                      {selectedData?.contactEmail || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        First Name:
                      </span>{" "}
                      {selectedData?.firstName || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Last Name:
                      </span>{" "}
                      {selectedData?.lastName || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">Gender:</span>{" "}
                      {selectedData?.gender || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Timestamps */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-Roboto">
                    Timestamps
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Created At:
                      </span>{" "}
                      {selectedData?.createdAt
                        ? new Date(selectedData.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium font-Roboto">
                        Updated At:
                      </span>{" "}
                      {selectedData?.updatedAt
                        ? new Date(selectedData.updatedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-Roboto rounded-lg shadow-md transition-all"
                  onClick={() => {
                    setSelectedData(null);
                    setShowModal(false);
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
