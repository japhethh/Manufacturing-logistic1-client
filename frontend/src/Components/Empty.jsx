import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';

const Empty = () => {
  useEffect(() => {
    // Initialize DataTables
    $(document).ready(function () {
      $('#emptyProductTable').DataTable({
        data: [],
        columns: [
          { title: 'Product Name' },
          { title: 'Price' },
          { title: 'Quantity' },
          { title: 'Category' },
          { title: 'Actions' },
        ],
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">No Data Available</h2>
      <p className="text-gray-600 mb-6">It looks like there are currently no items to display.</p>

      {/* Empty DataTable */}
      <div className="overflow-x-auto mb-4 w-full">
        <table
          id="emptyProductTable"
          className="display cell-border stripe hover w-full text-sm text-gray-700 border border-gray-300"
        >
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border-b border-gray-300 py-2">Product Name</th>
              <th className="border-b border-gray-300 py-2">Price</th>
              <th className="border-b border-gray-300 py-2">Quantity</th>
              <th className="border-b border-gray-300 py-2">Category</th>
              <th className="border-b border-gray-300 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* No data message in the table */}
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">No products available</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
        Go to Vendor Management
      </button>
    </div>
  );
};

export default Empty;
