import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";
const InventoryLogistic = () => {
  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/inventory/`, {
        headers: { token: token },
      });

      setInventoryData(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  });
  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: inventoryData,
      columns: [
        { title: "ID", data: "_id" },
        { title: "ID", data: "_id" },
        { title: "ID", data: "_id" },
        { title: "ID", data: "_id" },
      ],
    });
  });
  return (
    <div className="p-4">
      <h2 className="text-gray-800 font-semibold text-2xl">Payment Details</h2>
      <table id="myTable"></table>
    </div>
  );
};

export default InventoryLogistic;
