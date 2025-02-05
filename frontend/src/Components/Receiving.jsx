import { useState, useEffect } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../context/Store";
import { toast } from "react-toastify";
import Store from "../context/Store";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import io from "socket.io-client";
import { AiOutlineForm } from "react-icons/ai";
const Receiving = () => {
  const [trackOrdersData, setTrackOrdersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState("");
  const { token, fetchUserData, userData } = Store();
  const navigate = useNavigate(); // Initialize useNavigate
  const isAdmin = userData?.role === "admin";
  const isSuperAdmin = userData?.role === "superAdmin";

  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  useEffect(() => {
    fetchAllTrackingOrders();
    fetchUserData();
  }, []);

  const fetchAllTrackingOrders = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/trackingOrders/`);
      console.log(response.data);

      setTrackOrdersData(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on("updateStatus", (updatedNotification) => {
      setTrackOrdersData((prev) => {
        const existingOrderIndex = prev.findIndex(
          (order) => order._id === updatedNotification._id
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prev];
          updatedOrders[existingOrderIndex] = updatedNotification;
          return updatedOrders;
        } else {
          return [updatedNotification, ...prev];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      fetchAllTrackingOrders();
    } catch (error) {
      toast.error("Error approving invoice: " + error?.response.data.message);
    }
  };

  // const handleRejection = async (invoiceId) => {
  //   try {
  //     await axios.post(
  //       `${apiURL}/api/invoices/reject/${invoiceId}`,
  //       {},
  //       {
  //         headers: { token: token },
  //       }
  //     );
  //     toast.warn("Invoice rejected!");
  //     fetchAllTrackingOrders();
  //   } catch (error) {
  //     toast.error("Error rejecting invoice: " + error?.response.data.message);
  //   }
  // };

  const deleteOrder = async (trackingId) => {
    const status = "Deleted";
    try {
      const response = await axios.post(
        `${apiURL}/api/trackingOrders/deletedTrackingOrderSuperAdmin`,
        {
          trackingId,
          status,
        }
      );
      toast.error(response?.data.message);
    } catch (error) {
      toast.error(
        "Error deleting tracking order: " + error?.response.data.message
      );
      console.log(error?.response.data.message);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: trackOrdersData,
      columns: [
        {
          title: "Actions",
          data: null,
          render: (data) => {
            return `
              <div class="flex justify-center font-bold">
                <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${
                  data._id
                }">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="bg-green-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="qcBtn_${
                  data._id
                }">
                  <i class="fas fa-check-circle"></i> Quality Control
                </button>
                ${
                  isSuperAdmin
                    ? `<button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${data._id}">
                  <i class="fas fa-trash-alt"></i>
                </button>`
                    : ""
                }
                
              </div>

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
        {
          title: "Invoice #",
          data: "invoiceId.invoiceNumber",
          render: (data) => data,
        },
        {
          title: "PurchaseOrder #",
          data: "purchaseOrderId.purchaseOrderNumber",
          render: (data, type, row) => {
            return data ? data : "N/A";
          },
        },
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
            return `<span class=" ${statusClass}  inline-block px-2 py-1 rounded">${data}</span>`;
          },
        },
        {
          title: "Supplier Name",
          data: "supplier.supplierName",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Company Name",
          data: "generalSettings.companyName",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Purchase Order",
          data: "purchaseOrderId.totalAmount",
        },
        {
          title: "Invoice Amount",
          data: "invoiceAmount",
        },
        {
          title: "Vendor",
          data: "supplier.supplierName",
          render: (data) => (data ? data : "N/A"),
        },

        {
          title: "Total Amount",
          data: "totalAmount",
          render: (data) => `<span class="">₱${data.toFixed(2)}</span>`,
        },
        {
          title: "Payment",
          data: "invoiceId.paymentDetails.paymentMethod",
        },
        {
          title: "Contact Email",
          data: "supplier.email",
        },
        {
          title: "Contact Phone",
          data: "supplier.contactPhone",
        },
        {
          title: "Payment Term",
          data: "purchaseOrderId.paymentTerm",
        },
        {
          title: "Ratings",
          data: "supplier.rating",
        },
      ],
      order: [[4, "desc"]],
      rowCallback: (row, data) => {
        const detailBtn = row.querySelector(`#detailBtn_${data?._id}`);
        const qcBtn = row.querySelector(`#qcBtn_${data?._id}`);

        qcBtn.addEventListener("click", () => {
          // Navigate to Quality Control page with the invoiceId
          navigate(`/quality-control/${data.invoiceId._id}`);
        });

        detailBtn.addEventListener("click", () => {
          navigate(`/trackingOrder/detail/${data._id}`);
        });

        // Super Admin is Here
        if (isSuperAdmin) {
          const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);

          deleteBtn.addEventListener("click", () => {
            window.confirm("Are you sure you want to delete this order?") &&
              deleteOrder(data._id);
          });
        }
      },
    });

    return () => {
      table.destroy();
    };
  }, [trackOrdersData]);

  return (
    <div className="p-3 w-[80%] ">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <NavLink to="/warehouse" className="text-blue-600">
              Warehouse
            </NavLink>
          </li>
          <li>
            <a>Receiving</a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-opacity duration-500">
        <NavLink
          to="/trackorders/discrepancy_detection"
          className="w-full"
          aria-label="Discrepancy Detection"
        >
          <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-yellow-800 font-bold text-lg">
                Discrepancy Detection
              </h2>
              <AiOutlineForm className="text-4xl text-yellow-500" />
            </div>
            <span className="badge bg-yellow-200 text-yellow-800 rounded-full px-2 py-1 text-xs">
              5
            </span>
          </div>
        </NavLink>
      </div>
      <h1 className="text-3xl font-extrabold my-8 text-center drop-shadow-lg">
        Receiving in Warehouse Management
      </h1>

      <div className="overflow-x-auto">
        <table
          id="myTable"
          className="min-w-full table-xs display nowrap w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg text-black shadow-lg"
        ></table>
      </div>
      {showModal && <div className="modal">{/* Modal Content Here */}</div>}
    </div>
  );
};

export default Receiving;
