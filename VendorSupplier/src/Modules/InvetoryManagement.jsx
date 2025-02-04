import {
  FiBox,
  FiAlertTriangle,
  FiClipboard,
  FiPlus,
  FiEdit,
} from "react-icons/fi";

const InventoryManagement = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center flex items-center justify-center gap-2">
        <FiBox className="text-blue-600" /> Inventory Management
      </h1>

      {/* Inventory Dashboard */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Inventory Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-gray-50 rounded-lg shadow-md text-center">
            <div className="text-gray-600">Total Items</div>
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FiBox className="text-blue-600" /> 1,234
            </div>
            <div className="text-gray-500">Items in Stock</div>
          </div>
          <div className="p-5 bg-yellow-50 rounded-lg shadow-md text-center">
            <div className="text-yellow-600">Low Stock</div>
            <div className="text-3xl font-bold text-yellow-500 flex items-center justify-center gap-2">
              <FiAlertTriangle className="text-yellow-600" /> 58
            </div>
            <div className="text-gray-500">Below Threshold</div>
          </div>
          <div className="p-5 bg-gray-50 rounded-lg shadow-md text-center">
            <div className="text-gray-600">Warehouse Locations</div>
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FiClipboard className="text-blue-600" /> 4
            </div>
            <div className="text-gray-500">Active Warehouses</div>
          </div>
        </div>
      </div>

      {/* Stock Management */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Stock Management
        </h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition duration-200 mb-4 flex items-center gap-2">
          <FiPlus className="text-white" /> Add New Stock
        </button>

        {/* Stock Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-6 py-3 text-left">Item ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Stock Level</th>
                <th className="px-6 py-3 text-left">Warehouse</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4">#00123</td>
                <td className="px-6 py-4">Raw Material A</td>
                <td className="px-6 py-4">500</td>
                <td className="px-6 py-4">Warehouse 1</td>
                <td className="px-6 py-4">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                    <FiEdit /> Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Inventory Alerts
        </h2>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg flex items-center gap-2">
          <FiAlertTriangle className="text-yellow-600" /> Low Stock Alert: Raw
          Material B is below the threshold (only 10 left).
        </div>
      </div>

      {/* Inventory Reports */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Inventory Reports
        </h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2">
          <FiClipboard className="text-white" /> Generate Stock Report
        </button>
      </div>
    </div>
  );
};

export default InventoryManagement;
