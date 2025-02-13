import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
import Store from "../../context/Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentAllList = () => {
  const { token } = Store();
  const [paymentData, setPaymentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayment();
  }, []);

  const fetchPayment = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/paymentlist/payments`);
      setPaymentData(response.data.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  const handleViewDetail = (paymentId) => {
    navigate(`/payment-details/${paymentId}`);
  };

  useEffect(() => {
    if (paymentData.length) {
      const table = new DataTable("#paymentTable", {
        data: paymentData.map((payment) => ({
          external_reference_number:
            payment.attributes.external_reference_number,
          _id: payment.id,
          amount: payment.attributes.amount,
          description: payment.attributes.description,
          currency: payment.attributes.currency,
          status: payment.attributes.status,
          created_at: new Date(
            payment.attributes.created_at * 1000
          ).toLocaleString(),
          credited_at: new Date(
            payment.attributes.credited_at * 1000
          ).toLocaleString(),
          billing_name: payment.attributes.billing.name,
          billing_email: payment.attributes.billing.email,
          billing_phone: payment.attributes.billing.phone,
        })),
        columns: [
          {
            title: "External Reference Number",
            data: "external_reference_number",
          },
          {
            title: "Amount",
            data: "amount",
            render: (data) =>
              `₱${parseFloat(data).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}`,
          },
          { title: "Description", data: "description" },
          { title: "Currency", data: "currency" },
          {
            title: "Status",
            data: "status",
            render: (data) => {
              let statusClass = "";
              switch (data) {
                case "paid":
                  statusClass =
                    "bg-[#F6FFED] border border-[#B7EB8F] text-[#52C41A]";
                  break;
                case "unpaid":
                case "refunded":
                  statusClass =
                    "bg-[#FFF7E6] border border-[#FFE4B6] text-[#FB9916]";
                  break;
                default:
                  statusClass = "";
              }
              return `<span class="${statusClass} inline-block px-2 py-1 rounded">${data}</span>`;
            },
          },
          { title: "Created At", data: "created_at" },
          { title: "Credited At", data: "credited_at" },
          { title: "Billing Name", data: "billing_name" },
          { title: "Billing Email", data: "billing_email" },
          { title: "Billing Phone", data: "billing_phone" },
          {
            title: "Actions",
            data: null,
            render: (row) => {
              return `
                <div class="dropdown dropdown-end">
                  <button class="btn btn-ghost btn-circle" tabIndex="0" data-id="${row._id}">
                    <img style="width: 24px; height: 24px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO3VSwrCMBhF4TtqFtEt2i7T2pFuRdq5EvgFJyENRLjF80Gg2OQQ7EsCAAAAAABnkSTNkm6S9hj5eIpzp2iMkh6SXoVxjznWjVRZ/B1Jzo35wOLPuBQ2YdFYGwJLYRMWja0hkOfaNraGwLPDJn7WWB1uC3VoTB0eVItGildabXGeMxQ24dLQWIkc/Zg5NDTEJVviwcvjGr8V/wHTBgAAAADg77wBWTZQCh5Pk9sAAAAASUVORK5CYII=" alt="Actions Icon">
                  </button>
                  <ul tabIndex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li ">
                      <a class="view-details justify-between" >
                        View Details
                        <span class="badge">New</span>
                      </a>
                    </li>
                    <li><a class="refund" data-id="${row._id}">Refund</a></li>
                  </ul>
                </div>`;
            },
          },
        ],
        order: [[5, "desc"]],
      });

      // Row click event listener
      $("#paymentTable tbody").on("click", "tr", function () {
        const data = table.row(this).data();
        handleViewDetail(data._id); // Call handleViewDetail with row ID
      });

      // Prevent navigation when clicking dropdown and menu items
      $("#paymentTable tbody").on(
        "click",
        ".btn-circle, .menu li a",
        function (event) {
          event.stopPropagation(); // Stop row click event
        }
      );

      return () => {
        table.destroy();
      };
    }
  }, [paymentData]);

  return (
    <div className="max-w-6xl mx-auto py-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4 font-Roboto">
        Payment List
      </h1>
      <div className="overflow-auto">
        <table
          id="paymentTable"
          className="min-w-full display w-full border-collapse text-sm cursor-pointer"
        >
          {/* DataTable will populate rows here */}
        </table>
      </div>
    </div>
  );
};

export default PaymentAllList;
