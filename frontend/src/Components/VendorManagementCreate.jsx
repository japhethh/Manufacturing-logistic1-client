import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";

// VendorManagementCreate Component
const VendorManagementCreate = () => {
  useEffect(() => {
    // Initialize DataTables after component is mounted
    $(document).ready(function () {
      $("#vendorTable").DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        pageLength: 5, // Default entries per page
        lengthMenu: [
          [5, 10, 25, -1],
          [5, 10, 25, "All"], // Text for the user-friendly view
        ],
        language: {
          lengthMenu: "Show _MENU_ vendors", // Enhanced to use Tailwind styles
          zeroRecords: "No vendors found",
          info: "Showing _START_ to _END_ of _TOTAL_ vendors",
          infoEmpty: "No vendors available",
          infoFiltered: "(filtered from _MAX_ total vendors)",
        },
      });
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Vendor Management Create</h2>

      {/* Add Vendor Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Vendor Name"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
            <input
              type="email"
              placeholder="Vendor Email"
              className="input w-full md:w-1/2 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Vendor Address"
            className="input w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>

      {/* Vendor Data Table */}
      <div className="overflow-x-auto mb-4">
        <table
          id="vendorTable"
          className="display cell-border stripe hover w-full text-sm text-gray-700 border border-gray-300"
        >
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="border-b border-gray-300 py-3">Vendor Name</th>
              <th className="border-b border-gray-300 py-3">Email</th>
              <th className="border-b border-gray-300 py-3">Address</th>
              <th className="border-b border-gray-300 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="border-b border-gray-300 py-2">Vendor A</td>
              <td className="border-b border-gray-300 py-2">vendorA@example.com</td>
              <td className="border-b border-gray-300 py-2">123 Street, City</td>
              <td className="border-b border-gray-300 py-2 text-center">
                <button className="text-blue-600 hover:underline mr-2 transition duration-150">Edit</button>
                <button className="text-red-600 hover:underline transition duration-150">Delete</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="border-b border-gray-300 py-2">Vendor B</td>
              <td className="border-b border-gray-300 py-2">vendorB@example.com</td>
              <td className="border-b border-gray-300 py-2">456 Street, City</td>
              <td className="border-b border-gray-300 py-2 text-center">
                <button className="text-blue-600 hover:underline mr-2 transition duration-150">Edit</button>
                <button className="text-red-600 hover:underline transition duration-150">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing 1 to 5 of 10 vendors
        </div>
        <div>
          {/* Custom pagination buttons can be added here if needed */}
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default VendorManagementCreate;
