import DataTable from "datatables.net-dt";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";

const ReturnRequest = () => {
  const [requiredData, setRequiredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReturnRequest();
  }, []);

  const fetchReturnRequest = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/returnManagement`);
      setRequiredData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };
  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: requiredData,
      columns: [
        {
          title: "Return Request ID",
          data: "returnRequestNumber",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Purchase Order Id",
          data: "purchaseOrderId",

          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Supplier Id",
          data: "supplierId",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Reason",
          data: "reason",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Status",
          data: "status",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Reported By",
          data: "reportedBy",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Attachments",
          data: "attachments",
          render: (data) => {
            if (!data || data.length === 0) {
              return "N/A"; // No attachments
            }
            return data
              .map(
                (url) =>
                  `<img src="${url}" alt="Attachment" width="50" height="50" style="border-radius: 5px; margin: 2px;" />`
              )
              .join(""); // Convert array to a string of HTML elements
          },
        },

        {
          title: "Date",
          data: "createdAt",
          render: (data) =>
            `${data ? new Date(data).toLocaleDateString() : "N/A"}`,
        },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [requiredData]);
  return (
    <div className="p-2">
      <h1 className="font-bold text-3xl py-2 font-Roboto">Vendor Management</h1>
      <div className="overflow-x-auto">
        <table id="myTable"></table>
      </div>
    </div>
  );
};

export default ReturnRequest;
