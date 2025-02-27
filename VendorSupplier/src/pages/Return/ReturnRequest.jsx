import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/verifyStore";
import Store from "../../context/verifyStore";
const ReturnRequest = () => {
  const [returnRequestData, setReturnRequestData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = Store();

  useEffect(() => {
    fetchReturnRequest();
  }, []);

  const fetchReturnRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/vendor_return`, {
        headers: { token: token },
      });
      setLoading(false);
      console.log(response?.data);
      setReturnRequestData(response?.data);
    } catch (error) {
      console.log(error?.response?.data.message);
    }
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: returnRequestData,
      columns: [
        {
          title: "Return Request ID",
          data: "_id",
          render: (data) => `${data ? data : "N/A"}`,
        },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [returnRequestData]);

  return (
    <div className="p-3">
      <h1 className="font-semibold text-4xl text-gray-800">Return Request</h1>
      <table id="myTable"></table>
    </div>
  );
};

export default ReturnRequest;
