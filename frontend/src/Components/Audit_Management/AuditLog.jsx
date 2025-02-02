import axios from "axios";
import { useState, useEffect } from "react";
import Store from "../../context/Store";
import { apiURL } from "../../context/Store";
import DataTable from "datatables.net-dt";

const AuditLog = () => {
  const [loading, setLoading] = useState(false);
  const [auditLogData, setAuditLogData] = useState([]);
  const { token } = Store();

  // Fetching Data
  useEffect(() => {
    fetchAuditLog();
  }, []);

  const fetchAuditLog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/auditLogisticLog`, {
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
          render: (data) => `${data ? data : "N/A"}`,
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
      <table id="myTable"></table>
    </div>
  );
};

export default AuditLog;
