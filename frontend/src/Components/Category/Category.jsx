import { useEffect, useState } from "react";
import BiddingItems from "../Bidding/BiddingItems";
import axios from "axios";
import { apiURL } from "../../context/Store";

const Category = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL}/api/bidding-category`,
        category
      );

      setLoading(false);
      console.log(response?.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error?.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen"></div>
    );
  }

  return (
    <div>
      <div className="p-4">
        <BiddingItems />
        <div className="flex flex-row gap-4">
          <div className="py-3 shadow-md">
            <div className="bg-gray-100">
              <h1 className="font-semibold text-lg">Category List</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="category" className="label">
                Category
              </label>
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered"
              />

              <button className="text-white px-3 py-1 bg-blue-400 rounded-md ">
                Save
              </button>
              <button className="text-black px-3 py-1 bg-gray-400 rounded-md ">
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
