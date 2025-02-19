import { useEffect, useState } from "react";
import BiddingItems from "../Bidding/BiddingItems";
import axios from "axios";
import { apiURL } from "../../context/Store";
import DataTable from "datatables.net-dt";
import Store from "../../context/Store";
import { toast } from "react-toastify";

const Bidding = () => {
  const [bidding, setBidding] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = Store();

  useEffect(() => {
    if (token) {
      fetchCategoryData();
    }
  }, [token]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/bidding/category`, {
        headers: { token: token },
      });

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error?.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let table = new DataTable("#myTable", {
      destroy: true, // Prevent reinitialization issues
      data: data,
      columns: [
        { title: "#", data: "_id", render: (data) => data || "N/A" },
        {
          title: "Category",
          data: "category",
          render: (data) => data || "N/A",
        },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <div className="p-4">
      <BiddingItems />

      <div>
        <label htmlFor="name"></label>

      </div>
    </div>
  );
};

export default Bidding;
