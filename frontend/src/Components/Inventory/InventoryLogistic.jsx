import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";
import { useState } from "react";
import Store from "../../context/Store";
const InventoryLogistic = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const { token } = Store();
  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/inventory/`, {
        headers: { token: token },
      });

      setInventoryData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);
  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: inventoryData,
      columns: [
        { title: "ID", data: "_id" },
        { title: "Product Name", data: "productName" },
        { title: "Available Stock", data: "availableStock" },
        { title: "Total Stock", data: "totalStock" },
        { title: "Category", data: "category" },
        { title: "Last Supplier Name", data: "lastSupplierName" },
        { title: "Unit", data: "unit" },
        { title: "Warehouse", data: "warehouseLocation" },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [inventoryData]);
  return (
    <div className="p-4">
      <h2 className="text-gray-800 font-semibold text-2xl">Payment Details</h2>
      <table id="myTable"></table>
    </div>
  );
};

export default InventoryLogistic;
