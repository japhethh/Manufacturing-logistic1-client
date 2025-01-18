import { useState, useEffect } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
import Store from "../../context/Store";
import InvoiceItems from "./InvoiceItems";
import { useForm } from "react-hook-form";

const InvoiceAll = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState("");
  const { token } = Store();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAllInvoice();
  }, []);

  const fetchAllInvoice = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/invoices/`, {
        headers: { token: token },
      });
      setInvoiceData(response.data.invoices);
      console.log(response.data.invoices);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  const updateInvoiceStatus = (invoiceId, status) => {
    setInvoiceData((prevData) =>
      prevData.map((invoice) =>
        invoice._id === invoiceId
          ? { ...invoice, approvalStatus: status }
          : invoice
      )
    );
  };

  const handleApproval = async (invoiceId) => {
    try {
      await axios.post(
        `${apiURL}/api/invoices/approve/${invoiceId}`,
        {},
        {
          headers: { token: token },
        }
      );
      toast.success("Invoice approved and tracking order created!");
      updateInvoiceStatus(invoiceId, "Approved");
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
      updateInvoiceStatus(invoiceId, "Rejected");
    } catch (error) {
      toast.error("Error rejecting invoice: " + error?.response.data.message);
    }
  };

  const handlePayment = async (invoiceId) => {
    const invoiceToPay = invoiceData.find(
      (invoice) => invoice._id === invoiceId
    );
    if (!invoiceToPay) {
      toast.error("Invoice not found!");
      return;
    }

    setSelectedData(invoiceToPay);
    setModalType("payform");
    setShowModal(true);
  };

  const handlePaymentSubmit = async (data) => {
    const { description, status } = data;
    const invoiceToPay = selectedData;
    const { totalAmount } = invoiceToPay;

    console.log(data.status);
    try {
      const response = await axios.post(
        `${apiURL}/api/payment/payment-link`,
        {
          invoiceId: invoiceToPay._id,
          amount: totalAmount,
          description,
          status,
        },
        {
          headers: { token: token },
        }
      );

      const generatedLink = response.data.link;
      window.open(generatedLink, "_blank");
      toast.success("Payment processed successfully!");
      fetchAllInvoice();
      setSelectedData(null);
      setShowModal(false);
    } catch (error) {
      toast.error("Error processing payment: " + error?.response.data.message);
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
        {
          title: "PurchaseOrder #",
          data: null,
          render: (data) => data?.purchaseOrder?.purchaseOrderNumber || `N/A`,
        },
        {
          title: "Vendor",
          data: null,
          render: (data) => data?.vendor?.supplierName || `N/A`,
        },
        {
          title: "Vendor Email",
          data: null,
          render: (data) => data?.vendor?.supplierName || `N/A`,
        },
        {
          title: "Vendor Phone",
          data: null,
          render: (data) => data?.vendor?.contactPhone || `N/A`,
        },
        {
          title: "Approval Status",
          data: "approvalStatus",
          render: (data) => {
            let statusClass = "";
            switch (data) {
              case "Approved":
                statusClass = "bg-green-100 text-green-800";
                break;
              case "Rejected":
                statusClass = "bg-red-100 text-red-800";
                break;
              case "Pending":
              default:
                statusClass = "bg-blue-100 text-blue-800";
                break;
            }
            return `<span class="${statusClass} inline-block px-2 py-1 rounded">${data}</span>`;
          },
        },
        {
          title: "Total Amount",
          data: "totalAmount",
          render: (data) => `₱${data.toFixed(2)}`,
        },
        {
          title: "Status",
          data: "status",
          render: (data) => {
            let status = "";
            switch (data) {
              case "Paid":
                status = "bg-[#F6FFED] border border-[#B7EB8F] text-[#52C41A]";
                break;
              case "Unpaid":
                status = "bg-[#FFF7E6] border border-[#FFE4B6] text-[#FB9916]";
                break;
            }

            return `<span class="${status} inline-block px-2 py-1 rounded">${data}</span>`;
          },
        },
        {
          title: "Payment",
          data: "paymentDetails.paymentMethod",
        },
        {
          title: "Actions",
          data: null,
          render: (data) => {
            const isProcessed =
              data.approvalStatus === "Approved" ||
              data.approvalStatus === "Rejected";

            const isProcessedPay = data.approvalStatus === "Pending";
            return `
            <div class="space-y-2">
              <!-- Button Group: Reject and Approve -->
              <div class="flex items-center space-x-2">
                <!-- Reject Button -->
                <button
                  class="bg-red-500 text-xs text-white px-3 py-2 rounded-lg cursor-pointer rejectBtn hover:bg-red-600 transition ease-in-out duration-200"
                  ${isProcessed ? "style='display:none;'" : ""}
                  id="rejectBtn_${data?._id}"
                  aria-label="Reject"
                >
                  <i class="fas fa-times"></i>
                </button>
          
                <!-- Approve Button -->
                <button
                  class="bg-green-500 text-xs text-white px-3 py-2 rounded-lg cursor-pointer approveBtn hover:bg-green-600 transition ease-in-out duration-200"
                  ${isProcessed ? "style='display:none;'" : ""}
                  id="approveBtn_${data?._id}"
                  aria-label="Approve"
                >
                  <i class="fas fa-check"></i>
                </button>
              </div>
          
              <!-- Pay Button -->
              <div>
                <button
                  class="bg-blue-500 text-xs text-white px-3 py-2 rounded-lg cursor-pointer payBtn hover:bg-blue-600 transition ease-in-out duration-200"
                  ${isProcessedPay ? "style='display:none;'" : ""}
                  id="payBtn_${data?._id}"
                  aria-label="Pay"
                >
                  <i class="fas fa-money-bill"></i> Pay
                </button>
              </div>
            </div>
          `;
          
          },
        },
      ],
      order: [[2, "desc"]],
      rowCallback: (row, data) => {
        const approveBtn = row.querySelector(`#approveBtn_${data?._id}`);
        const rejectBtn = row.querySelector(`#rejectBtn_${data?._id}`);
        const payBtn = row.querySelector(`#payBtn_${data?._id}`);

        approveBtn?.addEventListener("click", () => {
          handleApproval(data._id);
        });

        rejectBtn?.addEventListener("click", () => {
          handleRejection(data._id);
        });

        payBtn?.addEventListener("click", () => {
          handlePayment(data._id);
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

      {/* Payment Form */}
      {showModal && modalType === "payform" && selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-lg p-6 w-4/6 max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Payment Details
            </h2>
            <form
              onSubmit={handleSubmit(handlePaymentSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="description" className="mb-1 text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  {...register("description", { required: true })}
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="totalAmount" className="mb-1 text-gray-700">
                  Total Amount
                </label>
                <input
                  type="text"
                  id="totalAmount"
                  value={selectedData.totalAmount.toFixed(2)}
                  disabled
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="payment" className="mb-1 text-gray-700">
                  Payment
                </label>
                <select
                  name="payment"
                  id="payment"
                  {...register("status", { required: "Required to choose!" })}
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value={selectedData.status}>
                    {selectedData.status}
                  </option>
                  <option value="">Select Option</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceAll;
