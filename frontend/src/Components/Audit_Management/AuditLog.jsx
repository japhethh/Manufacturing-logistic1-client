import axios from "axios";
import { useState, useEffect } from "react";
import Store from "../../context/Store";
import { apiURL } from "../../context/Store";
import DataTable from "datatables.net-dt";

const AuditLog = () => {
  const [loading, setLoading] = useState(false);
  const [auditLogData, setAuditLogData] = useState([]);
  const { token } = Store();

  // Fetch Audit Log Data
  useEffect(() => {
    fetchAuditLog();
  }, []);

  const fetchAuditLog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/auditLogisticLog`, {
        headers: { token: token },
      });

      // Sort the data by createdAt in descending order (latest first)
      const sortedData = response?.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAuditLogData(sortedData);
      console.log("Sorted Audit Log:", sortedData);
    } catch (error) {
      console.log("Error fetching audit log:", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize DataTable
  useEffect(() => {
    if (auditLogData.length === 0) return;

    const table = new DataTable("#myTable", {
      data: auditLogData,
      ordering: false, // Disable sorting from DataTables to keep the correct order
      columns: [
        {
          title: "Timestamp",
          data: "createdAt",
          render: (data) =>
            `${data ? new Date(data).toLocaleString() : "N/A"}`, // More accurate timestamp format
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
      ],
    });

    return () => {
      table.destroy();
    };
  }, [auditLogData]);

  return (
    <div className="px-4 py-4">
      {loading ? (
        <p className="text-center text-blue-500">Loading audit log...</p>
      ) : (
        <table id="myTable"></table>
      )}
    </div>
  );
};

export default AuditLog;
