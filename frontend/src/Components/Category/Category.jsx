import { useEffect, useState } from "react";
import BiddingItems from "../Bidding/BiddingItems";
import axios from "axios";
import { apiURL } from "../../context/Store";
import DataTable from "datatables.net-dt";
import Store from "../../context/Store";
import { toast } from "react-toastify";

const Category = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);

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

  const handleSubmit = async () => {
    if (!category) {
      return toast.warn("Category is Required !");
    }
    setWait(true);

    try {
      const response = await axios.post(
        `${apiURL}/api/bidding/category`,
        { category },
        { headers: { token: token } }
      );

      toast.success(response.data.message);
      fetchCategoryData();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving category");
    } finally {
      setWait(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <BiddingItems />
      <div className="flex md:flex-row flex-col gap-4 my-4">
        <div className="shadow-md p-3 h-full">
          <h1 className="font-semibold text-lg">Category List</h1>
          <label htmlFor="category" className="label">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered mb-3"
          />
          <div className="flex justify-center gap-2">
            <button
              disabled={wait}
              type="submit"
              className="text-white px-3 py-1 bg-blue-400 rounded-md"
              onClick={handleSubmit}
            >
              {wait ? "Saving..." : "Save"}
            </button>
            <button className="text-black px-3 py-1 bg-gray-400 rounded-md">
              Close
            </button>
          </div>
        </div>

        <div className="w-full">
          <table id="myTable" />
        </div>
      </div>
    </div>
  );
};

export default Category;
