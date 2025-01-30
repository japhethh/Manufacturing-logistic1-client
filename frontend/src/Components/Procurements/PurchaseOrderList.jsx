import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash, FiEye } from "react-icons/fi";
import DataTable from "datatables.net-dt";
import { MdRemoveRedEye } from "react-icons/md";
import Store from "../../context/Store";
const PurchaseOrderList = () => {
  const { userData, fetchUserData, token } = Store();

  const { apiURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchPurchaseOrder();
    fetchUserData();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: purchaseOrderData,
      columns: [
        {
          title: "#",
          data: null,
          render: (data) => `${data?.purchaseOrderNumber || "N/A"}`,
        },
        {
          title: "CreatedAt",
          data: null,
          render: (data) => `${data?.createdAt || "N/A"}`,
        },
        {
          title: "Supplier",
          data: null,
          render: (data) => `${data?.supplier?.supplierName || "N/A"}`,
        },
        {
          title: "Total Amount",
          data: null,
          render: (data) => `${data?.totalAmount || "N/A"}`,
        },
        {
          title: "Order Status",
          data: null,
          render: (data) => {
            const orderStatus = data?.orderStatus || "N/A";
            let statusClass = "";

            switch (orderStatus) {
              case "Pending":
                statusClass = "bg-blue-100 text-blue-800"; // Light blue for Pending
                break;
              case "Approved":
                statusClass = "bg-green-100 text-green-800"; // Light green for Approved
                break;
              case "In Process":
                statusClass = "bg-yellow-100 text-yellow-800"; // Light yellow for In Process
                break;
              case "Completed":
                statusClass = "bg-[#6241FF] text-white"; // Light orange for Shipped
                break;
              case "Delivered":
                statusClass = "bg-gray-100 text-gray-800"; // Light gray for Delivered
                break;
              default:
                statusClass = "bg-gray-200 text-gray-800"; // Default for unknown status
                break;
            }

            return `<span class="${statusClass} py-1 px-2 rounded">${orderStatus}</span>`;
          },
        },
        {
          title: "Approval Status",
          data: null,
          render: (data) => {
            const orderStatus = data?.approvalStatus || "N/A";
            let statusClass = "";

            switch (orderStatus) {
              case "Pending":
                statusClass = "bg-blue-100 text-blue-800"; // Light blue for Pending
                break;
              case "On process":
                statusClass = "bg-orange-200 text-orange-800";
                break;
              case "Approved":
                statusClass = "bg-green-100 text-green-800"; // Light green for Approved
                break;
              case "Rejected":
                statusClass = "bg-red-100 text-yellow-800"; // Light yellow for In Process
                break;
              case "Shipped":
                statusClass = "bg-orange-100 text-orange-800"; // Light orange for Shipped
                break;
              case "Delivered":
                statusClass = "bg-gray-100 text-gray-800"; // Light gray for Delivered
                break;
              default:
                statusClass = "bg-gray-200 text-gray-800"; // Default for unknown status
                break;
            }

            return `<span class="${statusClass} py-1 px-2 rounded">${orderStatus}</span>`;
          },
        },
        {
          title: "Pdf",
          data: null,
          render: (data) =>
            `<a class="text-blue-500 italic hover:text-blue-700 duration-100 underline" href="${
              data?.pdfURL ? data?.pdfURL : "N/A"
            }" target="_blank">Download PDF</a>`,
        },
        {
          title: "Action",
          data: null,
          render: (data) => {
            return `
              <div class="py-2 px-4 flex space-x-2">

              ${
                (userData?.role === "admin") | (userData?.role === "superAdmin")
                  ? ` <button
              id="detailsBtn_${data?._id}"
              class=" bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 duration-150 transition text-sm"
              onclick="window.location.href='/purchase_orders/view_po/${data._id}'"
            >
              <span class="inline text-lg"><i class="fa fa-eye text-sm"></i></span>
            </button>`
                  : ""
              }
             ${
               userData?.role === "superAdmin"
                 ? `<button
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 duration-150 transition text-sm"
                  id="deleteBtn_${data?._id}"
                >
                  <span class="inline text-lg"><i class="fa fa-trash text-sm"></i></span>
                </button>`
                 : ""
             }
                
              </div>
            `;
          },
        },
      ],
      order: [[0, "desc"]],
      rowCallback: (row, data) => {
        const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);

        if (deleteBtn) {
          deleteBtn.addEventListener("click", () =>
            handleDeleteClick(data?._id)
          );
        }
      },
    });

    return () => {
      table.destroy();
    };
  }, [purchaseOrderData]);

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/purchase-order/`);

      console.log(response);
      const updatedOrders = response.data.map((order) => {
        // Calculate totalAmount if items exist
        const totalAmount = order.items
          ? order.items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0)
          : 0;
        return { ...order, totalAmount }; // Add totalAmount to the order
      });
      setPurchaseOrderData(updatedOrders);
    } catch (error) {
      toast.error("Error fetching purchase orders.");
    }
  };

  const deletePurchaseOrder = async () => {
    try {
      await axios.post(
        `${apiURL}/api/purchase-order/delete/${selectedOrderId}`,
        {},
        {
          headers: { token: token },
        }
      );
      fetchPurchaseOrder();
      toast.info("Purchase Order deleted successfully.");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete purchase order.");
    }
  };

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 duration-150 text-white font-semibold text-xs md:text-md lg:text-base px-4 py-2 rounded-md w-[135px] md:w-[220px] lg:w-[220px]"
          onClick={() => navigate("/createpurchaseorder")}
        >
          + Create Purchase Order
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm p-3">
        {/* TABLE CLOSED */}
        {/* <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Created At</th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("purchaseOrderNumber")}
              >
                PO Number {getSortArrow("purchaseOrderNumber")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("supplierName")}
              >
                Supplier {getSortArrow("supplierName")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("totalAmount")}
              >
                Total Amount {getSortArrow("totalAmount")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("orderStatus")}
              >
                Order Status {getSortArrow("orderStatus")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => requestSort("approvalStatus")}
              >
                Approval Status {getSortArrow("")}
              </th>
              <th className="py-2 px-4 cursor-pointer">PDF</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{indexOfFirstOrder + index + 1}</td>
                <td className="py-2 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{order.purchaseOrderNumber}</td>
                <td className="py-2 px-4">
                  {order.supplier?.supplierName || "N/A"}
                </td>
                <td className="py-2 px-4">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.totalAmount)}
                </td>
                <td className="py-2 px-4">
                  <div
                    className={`inline-block px-2 py-1 rounded ${
                      order.orderStatus === "Pending"
                        ? "bg-blue-100 text-blue-800" // Light yellow for Pending
                        : order.orderStatus === "Approved" // Moved Approved to be right after Pending
                        ? "bg-green-100 text-green-800" // Light blue for Approved
                        : order.orderStatus === "In Process"
                        ? "bg-blue-100 border-blue-300" // Light blue for In Process
                        : order.orderStatus === "Shipped"
                        ? "bg-green-100 border-green-400" // Light green for Shipped
                        : order.orderStatus === "Delivered"
                        ? "bg-gray-100 border-gray-400" // Light gray for Delivered
                        : "" // Default case for unknown statuses
                    }`}
                    role="status" // Added role for accessibility
                  >
                    {order.orderStatus}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div
                    className={`inline-block px-2 py-1 rounded ${
                      order.financeApproval?.status === "Pending"
                        ? "bg-blue-100 text-blue-800"
                        : order.financeApproval?.status === "Reviewed"
                        ? "bg-blue-100 border-blue-300"
                        : order.financeApproval?.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : order.financeApproval?.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-200 border-gray-400" // Default case for unknown statuses
                    }`}
                  >
                    {order.financeApproval?.status}
                  </div>
                </td>
                <td className="py-2 px-4">
                  {order.pdfURL ? (
                    <a
                      href={order.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span>Generating PDF...</span> // You can show a loading state or N/A
                  )}
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-500 transition text-sm"
                    onClick={() =>
                      navigate(`/purchase_orders/view_po/${order._id}`)
                    }
                  >
                    <FiEye className="inline text-lg" />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-500 transition text-sm"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    <FiTrash className="inline text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <table className="table display" id="myTable">
          <thead className="bg-blue-800 text-white"></thead>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this purchase order?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-200 duration-150 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 duration-150 text-white px-4 py-2 rounded"
                onClick={deletePurchaseOrder}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderList;
