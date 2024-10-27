import { useState, useEffect } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
import Store from "../../context/Store";
import io from "socket.io-client";
import TrackOrderItems from "./TrackOrderItems";

const TrackOrder = () => {
  const [trackOrdersData, setTrackOrdersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState("");
  const { token } = Store();

  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  useEffect(() => {
    fetchAllTrackingOrders();
  }, []);

  const fetchAllTrackingOrders = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/trackingOrders/`);
      setTrackOrdersData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on("updateStatus", (updatedNotification) => {
      setTrackOrdersData((prev) => {
        // Update existing order or add a new one
        const existingOrderIndex = prev.findIndex(order => order._id === updatedNotification._id);
        if (existingOrderIndex !== -1) {
          // Update the existing order
          const updatedOrders = [...prev];
          updatedOrders[existingOrderIndex] = updatedNotification; // Update the order with new data
          return updatedOrders;
        } else {
          // Add the new notification to the list if it doesn't exist
          return [updatedNotification, ...prev]; // Add new notification to the top
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run only once on mount

  const handleApproval = async (invoiceId) => {
    console.log(invoiceId);
    try {
      await axios.post(
        `${apiURL}/api/invoices/approve/${invoiceId}`,
        {},
        {
          headers: { token: token },
        }
      );
      toast.success("Invoice approved and tracking order created!");
      fetchAllTrackingOrders(); // Refresh invoice list
    } catch (error) {
      toast.error("Error approving invoice: " + error?.response.data.message);
    }
  };

  const handleRejection = async (invoiceId) => {
    try {
      await axios.post(
        `${apiURL}/api/invoices/reject/${invoiceId}`,
        {},
        {
          headers: { token: token },
        }
      );
      toast.warn("Invoice rejected!");
      fetchAllTrackingOrders(); // Refresh invoice list
    } catch (error) {
      toast.error("Error rejecting invoice: " + error?.response.data.message);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: trackOrdersData,
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
          title: "PurchaseOrder #",
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
                statusClass = "bg-green-100 text-green-800"; // Light green background for approved
                break;
              case "Delivered":
                statusClass = "bg-red-100 text-red-800"; // Light red background for rejected
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
          title: "Total Amount",
          data: "totalAmount",
          render: (data) => `$${data.toFixed(2)}`,
        },
        { title: "Payment", data: "invoiceId.paymentDetails.paymentMethod" },
        { title: "Contact Email", data: "supplier.email" },
        { title: "Contact Phone", data: "supplier.contactPhone" },
        { title: "Payment Term", data: "purchaseOrderId.paymentTerm" },
        { title: "Ratings", data: "supplier.rating" },
        {
          title: "Actions",
          data: null,
          render: (data) => {
            return `
              <div class="flex justify-center">
                <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${data._id}">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="bg-blue-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="approveBtn_${data._id}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="rejectBtn_${data._id}">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            `;
          },
        },
      ],
      order: [[0, "desc"]],
      rowCallback: (row, data) => {
        const approveBtn = row.querySelector(`#approveBtn_${data?._id}`);
        const rejectBtn = row.querySelector(`#rejectBtn_${data?._id}`);

        approveBtn.addEventListener("click", () => {
          handleApproval(data._id);
        });

        rejectBtn.addEventListener("click", () => {
          handleRejection(data._id);
        });
      },
    });

    return () => {
      table.destroy();
    };
  }, [trackOrdersData]);

  return (
    <div className="p-5 w-[80%] ">
      <TrackOrderItems />
      <div className="overflow-x-auto">
        <table id="myTable" className="display min-w-full table-xs"></table>
      </div>
      {showModal && <div className="modal">{/* Modal Content Here */}</div>}
    </div>
  );
};

export default TrackOrder;
