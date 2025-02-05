import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-dt";
import { apiURL } from "../../context/verifyStore";
import verifyStore from "../../context/verifyStore";
import { useNavigate } from "react-router-dom";
import TrackingOrderItems from "./TrackingOrderItems";
import { toast } from "react-toastify";

const AllTrackingOrders = () => {
  const { token } = verifyStore();
  const [trackingOrdersData, setTrackingOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState(null);
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  useEffect(() => {
    fetchTrackingOrdersData();
  }, []);

  const fetchTrackingOrdersData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/trackingOrders/getAllTrackingOrderSupplier`,
        { headers: { token: token } }
      );

      setTrackingOrdersData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Error fetching tracking orders data");
    }
  };

  const newSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiURL}/api/trackingOrders/updateStatus/${selectedOrderId}`,
        {
          deliveryStatus: status,
          date,
          details: detail,
          description,
          location,
        },
        { headers: { token: token } }
      );
      toast.success(`Status updated to ${status}!`);
      fetchTrackingOrdersData();
    } catch (error) {
      console.log(error?.response.data.message);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    let table;
    if (trackingOrdersData.length > 0) {
      table = new DataTable("#myTable", {
        data: trackingOrdersData,
        columns: [
          {
            title: "Update Process",
            data: null,
            render: (data) => {
              return `
              <button class=" btn btn-primary text-white" id="updateProcessBtn_${data?._id}">Update</button>
`;
            },
          },
          {
            title: "Tracking Number #",
            data: "trackingOrderNumber",
            render: (data) =>
              `${data ? data : `<span class="text-red-500 ">N/A</span>`}`,
          },
          {
            title: "Track ID",
            data: "_id",
          },
          {
            title: "Created At",
            data: "createdAt",
            render: (data) => new Date(data).toLocaleDateString(),
          },
          {
            title: "Updated At",
            data: "updatedAt",
            render: (data) => new Date(data).toLocaleDateString(),
          },
          { title: "Invoice #", data: "invoiceId.invoiceNumber" },
          {
            title: "Purchase Order #",
            data: "purchaseOrderId.purchaseOrderNumber",
          },
          { title: "Supplier Name", data: "supplier.supplierName" },
          { title: "Purchase Order", data: "purchaseOrderId.totalAmount" },
          { title: "Invoice Amount", data: "invoiceAmount" },
          { title: "Vendor", data: "supplier.supplierName" },
          {
            title: "Delivery Status",
            data: "deliveryStatus",
            render: (data) => {
              let statusClass = "";
              switch (data) {
                case "Dispatch":
                  statusClass = "bg-yellow-100 text-yellow-800";
                  break;
                case "In Transit":
                  statusClass = "bg-blue-100 text-blue-800";
                  break;
                case "Delivered":
                  statusClass = "bg-green-100 text-green-800";
                  break;

                case "Pending":
                default:
                  statusClass = "bg-orange-100 text-orange-800";
                  break;
              }

              return `<span class="${statusClass} inline-block px-2 py-1 rounded">${data}</span>`;
            },
          },

          {
            title: "Actions",
            data: null,
            render: (data) => {
              return `
                <div class="flex justify-center items-center">
                  <select class="bg-white border border-gray-300 rounded px-2 py-1 text-xs mx-1 cursor-pointer" id="statusSelect_${
                    data._id
                  }">
                    <option value="Pending" ${
                      data.deliveryStatus === "Pending" ? "selected" : ""
                    }>Pending</option>
                    <option value="Dispatch" ${
                      data.deliveryStatus === "Dispatch" ? "selected" : ""
                    }>Dispatch</option>
                    <option value="In Transit" ${
                      data.deliveryStatus === "In Transit" ? "selected" : ""
                    }>In Transit</option>
                    <option value="Delivered" ${
                      data.deliveryStatus === "Delivered" ? "selected" : ""
                    }>Delivered</option>
                  </select>
                  <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${
                    data._id
                  }">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              `;
            },
          },
          {
            title: "Total Amount",
            data: "totalAmount",
            render: (data) => `₱${data.toFixed(2)}`,
          },
          { title: "Payment", data: "invoiceId.paymentDetails.paymentMethod" },
          { title: "Contact Email", data: "supplier.email" },
          { title: "Contact Phone", data: "supplier.contactPhone" },
          { title: "Payment Term", data: "purchaseOrderId.paymentTerm" },
          { title: "Ratings", data: "supplier.rating" },
        ],
        order: [[4, "desc"]],
        rowCallback: (row, data) => {
          const statusSelect = row.querySelector(`#statusSelect_${data._id}`);
          const detailBtn = row.querySelector(`#detailBtn_${data._id}`);
          const updateBtn = row.querySelector(`#updateProcessBtn_${data?._id}`);

          statusSelect.addEventListener("change", (event) => {
            handleStatusUpdate(data._id, event.target.value);
          });
          updateBtn.addEventListener("click", () => handleOpenModal(data._id));

          detailBtn.addEventListener("click", () => {
            navigate(`/order-details/${data._id}`);
          });
        },
      });
    }

    return () => {
      if (table) table.destroy(); // Cleanup to prevent multiple initializations
    };
  }, [trackingOrdersData]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    console.log(orderId);
    try {
      await axios.put(
        `${apiURL}/api/trackingOrders/updateStatus/${orderId}`,
        { deliveryStatus: newStatus },
        { headers: { token: token } }
      );
      toast.success(`Status updated to ${newStatus}!`);
      fetchTrackingOrdersData(); // Refresh the data
    } catch (error) {
      toast.error("Error updating status: " + error?.response?.data?.message);
    }
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setModalVisible(false);
  };

  console.log(selectedOrderId);

  return (
    <div className="p-5 lg:w-[1260px] bg-gray-200">
      <TrackingOrderItems />
      <div className="overflow-x-scroll w-full bg-white p-5 rounded-xl">
        <table id="myTable" className="display min-w-full table-xs">
          <thead className="bg-blue-800 text-white"></thead>
        </table>
      </div>

      {/* Modal for Viewing Order Details */}
      {modalVisible && selectedOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white rounded-lg p-5 w-[400px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-md font-bold mb-4 ">
              Order Details: {selectedOrderId}
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="">
                <label className="label">
                  <strong>Supplier Name:</strong>{" "}
                </label>

                <select
                  className="select mb-1 select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="label font-semibold" htmlFor="date">
                  Date
                </label>
                <input
                  className="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="date"
                  id="date"
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="label font-semibold">
              Details
            </label>
            <input
              type="text"
              className="input block input-bordered w-full"
              onChange={(e) => setDetail(e.target.value)}
            />
            <label htmlFor="description" className="label font-semibold">
              Description
            </label>
            <input
              type="text"
              className="input block input-bordered w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <label htmlFor="description" className="label font-semibold">
                Location
              </label>
              <input
                type="text"
                className="input block input-bordered w-full"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex justify-end items-center gap-2">
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                type="submit"
                onClick={newSubmit}
              >
                Save
              </button>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
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

export default AllTrackingOrders;
