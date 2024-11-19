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

  useEffect(() => {
    fetchTrackingOrdersData();
  }, []);

  const fetchTrackingOrdersData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/trackingOrders/`);
      setTrackingOrdersData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Error fetching tracking orders data");
    }
  };

  useEffect(() => {
    let table;
    if (trackingOrdersData.length > 0) {
      table = new DataTable("#myTable", {
        data: trackingOrdersData,
        columns: [
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
                case "In Transit":
                  statusClass = "bg-yellow-100 text-yellow-800"; // Light green background for approved
                  break;
                case "Delivered":
                  statusClass = "bg-green-100 text-green-800"; // Light red background for rejected
                  break;
                case "Pending":
                default:
                  statusClass = "bg-blue-100 text-blue-800"; // Light blue background for pending
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
            render: (data) => `$${data.toFixed(2)}`,
          },
          { title: "Payment", data: "invoiceId.paymentDetails.paymentMethod" },
          { title: "Contact Email", data: "supplier.email" },
          { title: "Contact Phone", data: "supplier.contactPhone" },
          { title: "Payment Term", data: "purchaseOrderId.paymentTerm" },
          { title: "Ratings", data: "supplier.rating" },
        ],
        order: [[0, "desc"]],
        rowCallback: (row, data) => {
          const statusSelect = row.querySelector(`#statusSelect_${data._id}`);
          const detailBtn = row.querySelector(`#detailBtn_${data._id}`);

          statusSelect.addEventListener("change", (event) => {
            handleStatusUpdate(data._id, event.target.value);
          });

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

  return (
    <div className="p-5 w-[1280px] bg-gray-200">
      <TrackingOrderItems />
      <div className="overflow-x-scroll w-full bg-white p-5 rounded-xl">
        <table id="myTable" className="display min-w-full table-xs"></table>
      </div>
    </div>
  );
};

export default AllTrackingOrders;
