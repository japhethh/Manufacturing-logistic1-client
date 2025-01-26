import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/Store";
const DiscrepancyDetection = () => {
  const [discrepancyData, setDiscrepancyData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiscrepancyDetection();
  }, []);

  // console.log(discrepancyData)
  const fetchDiscrepancyDetection = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/discrepancyDetectionFinal`
      );
      setDiscrepancyData(response?.data.discrepancies);
      console.log(response?.data.discrepancies);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };
  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: discrepancyData,
      columns: [
        {
          title: "Tracking Order Id",
          data: null,
          render: (data) => `${data?._id ? data?._id : "N/A"}`,
        },
        {
          title: "Discrepancy Difference",
          data: null,
          render: (data) => `${data?.discrepancyDetails?.invoiceDiscrepancy ? data?.discrepancyDetails?.invoiceDiscrepancy : "N/A"}`,
        },
        {
          title: "Discrepancy Reason",
          data: null,
          render: (data) =>
            `${
              data?.discrepancyReason
                ? `<span class=" ">${data?.discrepancyReason}</span>`
                : "N/A"
            }`,
        },
        {
          title: "InvoiceAmount",
          data: null,
          render: (data) =>
            `${data?.invoiceAmount ? data?.invoiceAmount : "N/A"}`,
        },
        {
          title: "PurchaseOrder Amount",
          data: null,
          render: (data) =>
            `${data?.purchaseOrderAmount ? data?.purchaseOrderAmount : "N/A"}`,
        },
        {
          title: "IsDiscrepancy",
          data: null,
          render: (data) =>
            `${data?.isDiscrepancy ? data?.isDiscrepancy : "N/A"}`,
        },
        {
          title: "Total Amount",
          data: null,
          render: (data) => `${data?.totalAmount ? data?.totalAmount : "N/A"}`,
        },
      ],
      // order: [[2, "desc"]],
    });

    return () => {
      table.destroy();
    };
  }, [discrepancyData]);
  return (
    <div className="px-10 rounded-full">
      <div className="p-5 shadow-md overflow-x-scroll w-full">
        {/* Vendor Create */}
        <div className="divider mb-5"></div>
        <h1 className="font-bold text-2xl py-2">Discrepancy Detections ℹ️</h1>

        <table id="myTable" className="display w-full">
          <thead className="text-white bg-blue-800">
            <tr className="text-xs"></tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default DiscrepancyDetection;
