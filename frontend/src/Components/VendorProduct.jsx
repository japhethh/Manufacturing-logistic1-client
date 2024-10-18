import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";

// VendorProduct Component
const VendorProduct = () => {
  useEffect(() => {
    // Initialize DataTables on component mount
    $(document).ready(function () {
      $("#vendorProductTable").DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        language: {
          lengthMenu: "Show _MENU_ entries",
          zeroRecords: "No products found",
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          infoEmpty: "No entries available",
          infoFiltered: "(filtered from _MAX_ total entries)",
        },
      });
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Vendor Product</h2>

      {/* Add Product Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              placeholder="Quantity"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
            <input
              type="text"
              placeholder="Category"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Vendor Product Data Table */}
      <div className="overflow-x-auto mb-4">
        <table
          id="vendorProductTable"
          className="display cell-border stripe hover w-full text-sm text-gray-700 border border-gray-300"
        >
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border-b border-gray-300 py-2">Product Name</th>
              <th className="border-b border-gray-300 py-2">Price</th>
              <th className="border-b border-gray-300 py-2">Quantity</th>
              <th className="border-b border-gray-300 py-2">Category</th>
              <th className="border-b border-gray-300 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Product Rows */}
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="border-b border-gray-300 py-2">Product A</td>
              <td className="border-b border-gray-300 py-2">$100</td>
              <td className="border-b border-gray-300 py-2">50</td>
              <td className="border-b border-gray-300 py-2">Category 1</td>
              <td className="border-b border-gray-300 py-2 text-center">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="border-b border-gray-300 py-2">Product B</td>
              <td className="border-b border-gray-300 py-2">$150</td>
              <td className="border-b border-gray-300 py-2">20</td>
              <td className="border-b border-gray-300 py-2">Category 2</td>
              <td className="border-b border-gray-300 py-2 text-center">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Entries per page and Export Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label htmlFor="entriesPerPage" className="mr-2 text-gray-700">Entries per page:</label>
          <select
            id="entriesPerPage"
            className="border border-gray-300 rounded-md p-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md">
            Apply
          </button>
        </div>
        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default VendorProduct;
