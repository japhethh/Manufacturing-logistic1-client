import { useState, useEffect } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
import Store from "../../context/Store";
import InvoiceItems from "./InvoiceItems";

const InvoiceAll = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState("");
  const { token } = Store();

  useEffect(() => {
    fetchAllInvoice();
  }, []);

  const fetchAllInvoice = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/invoices/`, {
        headers: { token: token },
      });
      setInvoiceData(response.data.invoices);
      console.log(response.data.invoices)
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

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
      fetchAllInvoice(); // Refresh invoice list
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
      fetchAllInvoice(); // Refresh invoice list
    } catch (error) {
      toast.error("Error rejecting invoice: " + error?.response.data.message);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: invoiceData,
      columns: [
        {
          title: "Issue Date",
          data: "issueDate",
          render: (data) => new Date(data).toLocaleDateString(),
        },
        {
          title: "Due Date",
          data: "dueDate",
          render: (data) => new Date(data).toLocaleDateString(),
        },
        { title: "Invoice #", data: "invoiceNumber" },
        { title: "PurchaseOrder #", data: "purchaseOrder.purchaseOrderNumber" },
        { title: "Vendor", data: "vendor.supplierName" },
        {
          title: "Approval Status",
          data: "approvalStatus",
          render: (data) => {
            let statusClass = "";

            switch (data) {
              case "Approved":
                statusClass = "bg-green-100 text-green-800"; // Light green background for approved
                break;
              case "Rejected":
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
        { title: "Payment", data: "paymentDetails.paymentMethod" },

        {
          title: "Actions",
          data: null,
          render: (data) => {
            return `
              <button class="bg-green-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer approveBtn" id="approveBtn_${data?._id}">
                  <i class="fas fa-check"></i>
              </button>
              <button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer rejectBtn" id="rejectBtn_${data?._id}">
                <i class="fas fa-times"></i>
              </button>
            `;
          },
        },
      ],
      order: [[2, "desc"]],
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
  }, [invoiceData]);

  return (
    <div className="p-5">
      <InvoiceItems />
      <div className="overflow-x-auto">
        <table id="myTable" className="display w-full text-sm"></table>
      </div>
      {showModal && <div className="modal">{/* Modal Content Here */}</div>}
    </div>
  );
};

export default InvoiceAll;
