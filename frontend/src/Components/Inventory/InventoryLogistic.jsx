import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { useState } from "react";
import Store from "../../context/Store";
import { toast } from "react-toastify";
const InventoryLogistic = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { fetchUserData, token, userData } = Store();
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  // Handle deleting a bidding product
  const handleDelete = async ({ id }) => {
    try {
      await axios.delete(`${apiURL}/api/inventory/${id}`, {
        headers: { token: token },
      });
      fetchInventoryData(); // Refresh the product list
      toast.info("Product deleted successfully!");
      setSelectedData(null); // Reset selected data
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/inventory/`, {
        headers: { token: token },
      });

      setInventoryData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  const handleUpdate = async ({ inventoryId }) => {
    try {
      const response = await axios.post(
        `${apiURL}/api/inventory/update`,
        {
          quantity,
          inventoryId,
        },
        { headers: { token: token } }
      );
      setQuantity(0);
      setSelectedData(null);
      setShowModal(false);
      fetchInventoryData();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);
  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: inventoryData,
      columns: [
        { title: "ID", data: "_id" },
        { title: "Product Name", data: "productName" },
        { title: "Available Stock", data: "availableStock" },
        { title: "Total Stock", data: "totalStock" },
        { title: "Category", data: "category" },
        { title: "Last Supplier Name", data: "lastSupplierName" },
        { title: "Unit", data: "unit" },
        { title: "Warehouse", data: "warehouseLocation" },
        {
          title: "Action",
          data: null,
          render: (data, row) => {
            return `
            <div>
              <button class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${data?._id}">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="detailBtn_${data._id}">
                <i class="fas fa-eye"></i>
              </button>
            </div>`;
          },
        },
      ],
      rowCallback: (row, data) => {
        const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);
        deleteBtn.addEventListener("click", () => {
          setSelectedData(data);
          setModalType("delete");
          setShowModal(true);
        });

        const detailBtn = row.querySelector(`#detailBtn_${data?._id}`);
        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("detail");
            setShowModal(true);
            setFetchAdjustment(data);
          });
        }
      },
    });

    return () => {
      table.destroy();
    };
  }, [inventoryData]);
  return (
    <div className="p-4">
      <h2 className="text-gray-800 font-semibold text-4xl">Inventory</h2>
      <table id="myTable"></table>

      {/* Delete Modal */}
      {showModal && modalType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h3 className="text-lg font-bold font-Roboto">Inventory</h3>
            <p className="py-4 font-Roboto">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold font-Roboto">delete</span>{" "}
              the item{" "}
              <span className="font-bold font-Roboto">
                {selectedData?.materialName}
              </span>
              ? This action cannot be undone and will permanently remove the
              item product from the system.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() =>
                  handleDelete({
                    id: selectedData._id,
                  })
                }
                className="btn btn-error btn-md text-white font-Roboto"
              >
                Confirm
              </button>
              <button
                className="btn btn-outline btn-error btn-md text-white font-Roboto"
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

      {/* Detail Modal */}
      {showModal &&
        modalType === "detail" &&
        selectedData &&
        fetchAdjustment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-hidden">
              {/* Title */}
              <h1 className="text-2xl font-semibold py-2 font-Roboto text-gray-800">
                Details
              </h1>

              {/* Details Section */}
              <div className="space-y-3">
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 flex justify-center items-center font-Roboto font-medium">
                    <label htmlFor="availableStock" className="label">
                      Available Stock
                    </label>
                  </div>
                  <div className="w-1/2 p-4 flex font-semibold text-xl justify-center items-center">
                    {selectedData?.availableStock}
                  </div>
                </div>
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 flex justify-center items-center font-Roboto font-medium">
                    <label htmlFor="quantity" className="label">
                      Quantity
                    </label>
                  </div>
                  <div className="w-1/2 p-2">
                    <input
                      type="text"
                      value={quantity}
                      className="input input-bordered"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center my-3">
                <button
                  onClick={() => {
                    handleUpdate({ inventoryId: selectedData?._id });
                  }}
                  className="btn btn-success btn-md text-white font-Roboto"
                >
                  Confirm
                </button>
              </div>

              {/* Button Section */}
              <div className="flex justify-end ">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-Roboto hover:opacity-80 transition"
                  onClick={() => {
                    setSelectedData(null);
                    setShowModal(false);
                    setFetchAdjustment(null);
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

export default InventoryLogistic;
