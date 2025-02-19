import { useEffect, useState } from "react";
import VendorManagementItem from "./VendorManagementItem";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
import Store from "../../context/Store";

const VendorManagementAll = () => {
  const { userData, fetchUserData } = Store();
  const [supplierData, setSuppliersData] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const { token } = verify();
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(""); // To determine if modal is for "add" or "delete"

  useEffect(() => {
    fetchVendor();
    fetchMaterial();
    fetchUserData();
  }, []);

  const fetchVendor = async () => {
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

  const fetchMaterial = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getAllMaterialNoToken`
      );
      setMaterials(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: supplierData,
      columns: [
        {
          title: "Category ID",
          data: "_id",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Company Name",
          data: "supplierName",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Code",
          data: "supplierCode",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Person",
          data: "contactPerson",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Email",
          data: "contactEmail",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Phone",
          data: "contactPhone",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Address",
          data: "address.street",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Payment Term",
          data: "paymentTerms",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },
        {
          title: "Ratings",
          data: "rating",
          render: (data) =>
            `${
              data ? data : `<div class="text-red-500 font-Roboto">N/A</div>`
            }`,
        },

        // { title: "Category Name", data: "category_name" },
        {
          title: userData?.role === "superAdmin" ? "Action" : "",
          data: null,
          render: (data) => {
            return `

            ${
              userData?.role === "superAdmin"
                ? `
              <button class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${data?._id}">
              <i class="fas fa-trash-alt"></i>
              </button>`
                : ""
            }
            `;
          },
        },
      ],
      order: [[2, "desc"]],
      rowCallback: (row, data) => {
        // Attach an event listener to the delete button for each row
        if (userData?.role === "superAdmin") {
          const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);

          deleteBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("delete"); // Set modal for delete
            setShowModal(true); // Show the modal
          });
        }
      },
    });

    return () => {
      table.destroy(); // Clean up to avoid memory leaks
    };
  }, [supplierData]);

  useEffect(() => {
    const table = new DataTable("#myTable1", {
      data: materials,
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
          title: "Vendor",
          data: "supplier.supplierName",
          render: (data) =>
            `${data ? data : `<div class="text-red-500">N/A</div>`}`,
        },
        {
          title: userData?.role === "superAdmin" ? "Actions" : "",
          data: null,
          render: (data, type, row) => `
          <div class="flex justify-center">
          <button class="bg-blue-700 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${
            row._id
          }"> <i class="fas fa-eye"></i>
            </button>
          ${
            userData?.role === "superAdmin"
              ? ` <button class="bg-blue-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">
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
      order: [[2, "desc"]],
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
        }
      },
    });
    return () => {
      table.destroy(); // Clean up to avoid memory leaks
    };
  }, [materials]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/api/material/deleteMaterial/${id}`);
      toast.info("Product deleted successfully!");
      fetchMaterial(); // Refresh data
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
      // toast.info(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="p-2">
      <VendorManagementItem />

      <div className="grid grid-cols-1 gap-3">
        <div className="p-5 shadow-md overflow-x-scroll w-full">
          {/* Vendors */}
          <div className="divider mb-5"></div>
          <h1 className="font-bold text-3xl py-2 font-Roboto">
            Vendor Management
          </h1>
          <table id="myTable" className="display w-full ">
            <thead className="text-white bg-blue-800"></thead>
          </table>
        </div>

        <div className="p-5 shadow-md overflow-x-scroll w-full">
          {/* Vendor Create */}
          <div className="divider mb-5"></div>
          <h1 className="font-bold text-2xl py-2 font-Roboto">
            Vendors Products
          </h1>
          <table id="myTable1" className="display w-full">
            <thead className="text-white bg-blue-800"></thead>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && modalType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h3 className="text-lg font-bold font-Roboto">Vendor</h3>
            <p className="py-4 font-Roboto">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold font-Roboto">delete</span>{" "}
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
                <div className="border border-1 py-2 px-2 font-bold font-Roboto text-md">
                  <h1>Vendor Name</h1>
                </div>
                <div className="border border-1 py-2 px-2 font-bold font-Roboto text-md">
                  <h1>Vendor Code</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Material CODE</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Material Name</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Category</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Price</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Quantity</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Alert Quantity</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Tax</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Note</h1>
                </div>
                <div className="border border-1 font-Roboto py-2 px-2">
                  <h1>Average Delivery Time</h1>
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
                    {selectedData?.available ? selectedData?.available : "N/A"}
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
                  <h1 className="font-Roboto">
                    {selectedData?.tax ? selectedData?.tax : "N/A"}
                  </h1>
                </div>
                <div className="border border-1 py-2 px-2">
                  <h1 className="font-Roboto">
                    {selectedData?.note
                      ? selectedData?.note
                      : "N/A"}
                  </h1>
                </div>
                <div className="border border-1 py-2 px-2">
                  <h1 className="font-Roboto">
                    {selectedData?.averageDeliveryTime
                      ? selectedData?.averageDeliveryTime
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
  );
};

export default VendorManagementAll;
