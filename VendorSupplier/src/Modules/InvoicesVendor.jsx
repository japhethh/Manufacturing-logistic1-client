import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import { Link } from "react-router-dom";

const InvoicesVendor = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const { token } = verifyStore();

  const invoiceLength = invoiceData.length; // Now this will return 0 when the array is empty
  console.log(invoiceLength);

  useEffect(() => {
    fetchInvoice();
  }, []);
  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/invoices/vendorList`, {
        headers: { token: token },
      });

      console.log(response.data.invoices);
      setInvoiceData(response.data.invoices);
    } catch (error) {
      console.log(error?.reponse.data.message);
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
        { title: "Vendor Email", data: "vendor.email" },
        { title: "Vendor Phone", data: "vendor.contactPhone" },
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
              case "Pending":
                status = "bg-blue-100 border border-blue-700 text-blue-700";
            }

            return `<span class="${status} inline-block px-2 py-1 rounded">${data}</span>`;
          },
        },
        {
          title: "Payment",
          data: "paymentDetails.paymentMethod",
        },
        // {
        //   title: "Actions",
        //   data: null,
        //   render: (data) => {
        //     const isProcessed =
        //       data.approvalStatus === "Approved" ||
        //       data.approvalStatus === "Rejected";

        //     const isProcessedPay = data.approvalStatus === "Pending";
        //     return `
        //       <div>
        //         <button class="bg-green-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer approveBtn hover:bg-green-600 transition ease-in-out duration-200" ${
        //           isProcessed ? "style='display:none;'" : ""
        //         } id="approveBtn_${data?._id}">
        //           <i class="fas fa-check"></i>
        //         </button>
        //         <button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer rejectBtn hover:bg-red-600 transition ease-in-out duration-200" ${
        //           isProcessed ? "style='display:none;'" : ""
        //         } id="rejectBtn_${data?._id}">
        //           <i class="fas fa-times"></i>
        //         </button>
        //         <button class="bg-blue-500 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer payBtn hover:bg-blue-600 transition ease-in-out duration-200"
        //         ${isProcessedPay ? "style='display:none;'" : ""} id="payBtn_${
        //       data?._id
        //     }">
        //           <i class="fas fa-money-bill"></i> Pay
        //         </button>
        //       </div>
        //     `;
        //   },
        // },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [invoiceData]);

  return (
    <div className="p-2 bg-gray-100 ">
      {/* BreadCrumbs */}
      <div className="breadcrumbs text-sm p-4">
        <ul>
          <li>
            <Link to="/paymentList">
              <span className="text-gray-500 font-semibold underline">
                All payments
              </span>
            </Link>
          </li>
          <li>
            Example Main
          </li>
        </ul>
      </div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Invoice Management
      </h1>

      {/* Invoice Dashboard */}
      <div className="mb-8 mx-3 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Invoice Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Total Invoices</div>
            <div className="stat-value text-3xl text-gray-800">
              {invoiceLength}
            </div>
            <div className="stat-desc text-gray-500">Invoices Generated</div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Pending Payment</div>
            <div className="stat-value text-3xl text-blue-500">75</div>
            <div className="stat-desc text-gray-500">
              Invoices Pending Payment
            </div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Paid Invoices</div>
            <div className="stat-value text-3xl text-green-500">75</div>
            <div className="stat-desc text-gray-500">Invoices Paid</div>
          </div>
        </div>
      </div>
      <div className="divider m-0"></div>

      <div className="flex justify-end my-2 mx-3">
        <Link
          to="/createInvoice"
          className="py-2 px-5 rounded-md bg-[#3C78C6]  text-white"
        >
          Create Invoice
        </Link>
      </div>
      <div className="mx-3">
        <table id="myTable" className="display w-full text-sm "></table>
      </div>

      {/* Create Invoice */}
      {/* <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Invoice</h2>
        <form className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Vendor</span>
            </label>
            <select className="select select-bordered w-full bg-gray-50">
              <option>Select Vendor</option>
              <option>Vendor A</option>
              <option>Vendor B</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Invoice Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-gray-50"
              value={invoiceData}
              // onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Due Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-gray-50"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Invoice Amount</span>
            </label>
            <input type="number" className="input input-bordered w-full bg-gray-50" placeholder="Enter Amount" />
          </div>

          <button className="btn btn-primary mt-4 w-full">Create Invoice</button>
        </form>
      </div> */}

      {/* Invoice Alerts */}
      {/* <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Alerts</h2>
        <div className="alert alert-warning shadow-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <span>Overdue Invoice: Invoice #54321 is overdue by 5 days.</span>
        </div>
      </div> */}

      {/* Invoice Reports */}
      {/* <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Reports</h2>
        <button className="btn btn-outline btn-primary w-full">Generate Invoice Report</button>
      </div>
        <button className="btn btn-outline btn-success w-full">Generate Invoice Report</button>
      </div> */}
    </div>
  );
};

export default InvoicesVendor;
