import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../../context/verifyStore";
import verifyStore from "../../context/verifyStore";
import DataTable from "datatables.net-dt";

const AuditLogVendor = () => {
  const [loading, setLoading] = useState(false);
  const [auditLogData, setAuditLogData] = useState([]);

  const { token } = verifyStore();
  // Fetching Data
  useEffect(() => {
    fetchAuditLog();
  }, []);

  const fetchAuditLog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/auditVendorLog`, {
        headers: { token: token },
      });

      setAuditLogData(response?.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: auditLogData,
      columns: [
        {
          title: "Timestamp",
          data: "createdAt",
          render: (data) =>
            `${data ? new Date(data).toLocaleDateString() : "N/A"}`,
        },
        {
          title: "Actor",
          data: "role",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Actions",
          data: "eventTypes",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Entity Type",
          data: "entityType",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Supplier Name",
          data: "performeBy.supplierName",
          render: (data) => `${data ? data : "N/A"}`,
        },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [auditLogData]);

  return (
    <div className="px-4 py-4">
      <table id="myTable"></table>
    </div>
  );
};

export default AuditLogVendor;
