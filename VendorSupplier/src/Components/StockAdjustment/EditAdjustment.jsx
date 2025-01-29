import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import verify, { apiURL } from "../../context/verifyStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditAdjustment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const { token } = verify();
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  // const [adjusted_products, setAdjusted_products] = useState([]);
  const [adjustment, setAdjustment] = useState([]);
  const { id } = useParams();

  const fetchAllAdjust = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/adjustments/getSpecificId/${id}`,
        { headers: { token: token } }
      );
      // setAdjusted_products(response.data.adjusted_products);
      setData(response.data.adjusted_products);
      setAdjustment(response.data.adjustment);
      setNotes(response.data.adjustment.note);
      setDate(response.data.adjustment.date.split("T")[0]); // Ensure correct format
      console.log(response.data.adjusted_products);

      console.log(response.data.adjustment);
    } catch (error) {
      console.log(error?.response.data.message);
      toast.error(error?.response.data.message);
    }
  };

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
      setDate(response.data.adjustment.date);
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
      const response = await axios.put(
        `${apiURL}/api/adjustments/update/${adjustment._id}`,
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
    fetchAllAdjust();
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
  const handleDelete = async (selectedItem) => {
    try {
      const response = await axios.delete(
        `${apiURL}/api/adjusted_products/delete/${selectedItem._id}`,
        { headers: { token: token } }
      );

      toast.info(response.data.message);

      setData((prevData) =>
        prevData.filter((item) => item._id !== selectedItem._id)
      );
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  return (
    <div className="mx-4">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-6 shadow-lg bg-white p-4 rounded-lg">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/adjustments"
              className="text-blue-600 hover:text-blue-800 transition-all"
            >
              Stock adjustment
            </Link>
          </li>
          <li className="text-gray-600">Edit Stock</li>
        </ul>
      </div>

      {/* Search Section */}
      <div className="m-4 bg-white shadow-lg rounded-lg p-6">
        <div className="relative">
          <label className="input-label text-base font-medium text-black">
            Search by Material Name
          </label>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              className="input-field flex-1 transition-all p-2 border border-black/50 rounded-lg"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70 transition-all"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {searchTerm && (
            <ul className="menu bg-white border border-gray-200 rounded-lg mt-2 p-2">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between p-3 border-b hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => handleAddToTable(item)}
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
                      className="h-16 w-16 object-cover rounded-md ml-4"
                    />
                  </li>
                ))
              ) : (
                <li className="p-2">No materials found.</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Form for creating adjustment */}
      <div className="m-4 bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Reference */}
          <div>
            <label
              htmlFor="reference"
              className="block text-base font-medium text-black"
            >
              Reference <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={adjustment?.reference}
              disabled
              id="reference"
              className="input-field bg-gray-100 p-1 rounded-md font-medium"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-base font-medium text-black"
            >
              Order Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field bg-gray-100 p-1 rounded-md font-medium"
            />
          </div>
        </div>

        {/* Table for selected materials */}
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Product Name</th>
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((row) => (
                <tr
                  key={row?.material_id?.id || row._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">
                    {row?.material_id?.id || row._id}
                  </td>
                  <td className="px-4 py-3">
                    {row?.material_id?.materialName || row.materialName}
                  </td>
                  <td className="px-4 py-3">
                    {row?.material_id?.materialCode || row.materialCode}
                  </td>
                  <td className="px-4 py-3">
                    <button className="btn bg-[#3399FF] text-white font-bold btn-xs hover:bg-[#0069d9] transition-all">
                      {row?.material_id?.available || row?.available}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={row?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(row._id, e.target.value)
                      }
                      className="w-16 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
                      min="1"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row?.type || "add"}
                      onChange={(e) =>
                        handleTypeChange(row.id || row._id, e.target.value)
                      }
                      className="w-20 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="add">add</option>
                      <option value="sub">sub</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(row)}
                      className="btn bg-red-500 text-white font-bold btn-xs hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Section */}
        <div className="my-6">
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
            className="input-field border border-black/60 rounded-md p-3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="btn bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Submit Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdjustment;
