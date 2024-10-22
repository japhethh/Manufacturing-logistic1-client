import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import verify, { apiURL } from "../../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAdjustment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const { token } = verify();
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getAllMaterial`,
        {
          headers: { token: token },
        }
      );
      setInitialData(response.data);
      setSearchResults(response.data); // Set initial search results to show all items by default
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async () => {
    const details = data;
    const kupal = {
      date: date,
      details,
      notes,
    };
    console.log(kupal);
    try {
      const response = await axios.post(
        `${apiURL}/api/adjustments/create`,
        kupal,
        { headers: { token: token } }
      );

      toast.success(response.data.message);
      setData([]);
      setDate(null);
      setNotes(null);
    } catch (error) {
      toast.warn(error?.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filteredResults = initialData.filter((item) =>
        item.materialName.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(initialData); // Show all items if search term is cleared
    }
  };

  // Function to handle adding the selected material to the table
  const handleAddToTable = (selectedItem) => {
    // Check if the selected item is already in the table
    const itemExists = data.some((item) => item._id === selectedItem?._id);
    if (!itemExists) {
      // Initialize quantity and type
      const newItem = { ...selectedItem, quantity: 1, type: "add" };
      setData((prevData) => [...prevData, newItem]); // Add the item to the table if it doesn't exist
    }
  };

  // Handle quantity change for a specific item
  const handleQuantityChange = (id, newQuantity) => {
    setData((prevData) =>
      prevData.map((item) =>
        item?._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle type change for a specific item
  const handleTypeChange = (id, newType) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, type: newType } : item
      )
    );
  };

  // Handle deleting an item from the table
  const handleDelete = (selectedItem) => {
    setData((prevData) =>
      prevData.filter((item) => item._id !== selectedItem._id)
    );
  };

  return (
    <div className="mx-4">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <Link to="/dashboardvendor">Home</Link>
          </li>
          <li>
            <Link to="/adjustments">Adjustment</Link>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      {/* Search */}
      <div className="m-4 bg-white shadow-md p-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search by Material Name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {searchTerm && (
            <ul className="menu bg-base-100 w-full p-2 mt-2">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <li key={item._id} className="p-2 border-b">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleAddToTable(item)} // Add item to table on click
                    >
                      <div>
                        <p>
                          <strong>Material:</strong> {item.materialName}
                        </p>
                        <p>
                          <strong>Code:</strong> {item.materialCode}
                        </p>
                        <p>
                          <strong>Available:</strong> {item.available}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.pricePerUnit}
                        </p>
                      </div>
                      <img
                        src={item.image}
                        alt={item.materialName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </div>
                  </li>
                ))
              ) : (
                <li>No materials found.</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Form for creating adjustment */}
      <div className="m-4 bg-white shadow-md p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Reference */}
          <div>
            <label
              htmlFor="reference"
              className="block text-base font-medium text-[#07074D]"
            >
              Reference <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value="ADJ"
              disabled
              id="reference"
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-base font-medium text-[#07074D]"
            >
              Order Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date} // Use date state here
              onChange={(e) => setDate(e.target.value)} // Update the date state
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
            />
          </div>
        </div>

        <div className="my-4">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">ID</th>
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Code</th>
                <th className="border border-gray-400 p-2">Stock</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Type</th>
                <th className="border border-gray-400 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id || row._id}>
                  <td className="border border-gray-400 p-2">
                    {row.id || row._id}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {row.materialName || row.materialName}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {row.materialCode || row.materialCode}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex justify-center items-center">
                      <button className="btn bg-[#3399FF] text-white font-bold btn-xs ">
                        {row.available}
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="number"
                      value={row?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(row._id || row._id, e.target.value)
                      }
                      className="w-16 px-2 py-1 border rounded"
                      min="1"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <select
                      value={row.type || "add"}
                      onChange={(e) =>
                        handleTypeChange(row.id || row._id, e.target.value)
                      }
                      className="w-20 px-2 py-1 border rounded"
                    >
                      <option value="add">add</option>
                      <option value="sub">sub</option>
                    </select>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <button
                      onClick={() => handleDelete(row)}
                      className="btn bg-red-500 text-white font-bold btn-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <label
            htmlFor="notes"
            className="block text-base font-medium text-[#07074D]"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
          ></textarea>
        </div>

        <div className="my-4 flex justify-end">
          <button
            onClick={onSubmit}
            className="btn bg-[#3399FF] text-white font-bold px-6 py-2 rounded-md"
          >
            Submit Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdjustment;
