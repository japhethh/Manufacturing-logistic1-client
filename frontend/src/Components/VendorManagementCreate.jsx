import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import { apiURL } from "../context/Store";
import store from "../context/Store";
import axios from "axios";
import { toast } from "react-toastify";
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
          title: "Supplier Name",
          data: "supplierName",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Contact Person",
          data: "contactPerson",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Supplier Name",
          data: "supplierName",
          render: (data) => (data ? data : "N/A"),
        },
        {
          title: "Actions",
          data: null,
          render: (data, type, row) => `
            <div className="flex gap-2"> 
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
      },
    });
    return () => {
      table.destroy(); // Clean up DataTable instance
    };
  }, [suppliersData]);

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
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Vendor Management Create
      </h2>

      {/* Add Vendor Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
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
      <table id="supplierTable" className="display w-full"></table>

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
    </div>
  );
};

export default VendorManagementCreate;
