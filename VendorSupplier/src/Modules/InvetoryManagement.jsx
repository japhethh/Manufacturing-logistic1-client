
const InventoryManagement = () => {
  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Inventory Management</h1>

      {/* Inventory Dashboard */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventory Overview</h2>
        <div className="stats stats-vertical lg:stats-horizontal bg-white shadow">
          <div className="stat">
            <div className="stat-title text-gray-600">Total Items</div>
            <div className="stat-value text-gray-800">1,234</div>
            <div className="stat-desc text-gray-500">Items in Stock</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-600">Low Stock</div>
            <div className="stat-value text-yellow-500">58</div>
            <div className="stat-desc text-gray-500">Items Below Threshold</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-600">Warehouse Locations</div>
            <div className="stat-value text-gray-800">4</div>
            <div className="stat-desc text-gray-500">Active Warehouses</div>
          </div>
        </div>
      </div>

      {/* Stock Management */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Management</h2>
        <button className="btn btn-outline btn-primary mb-4">Add New Stock</button>
        {/* Table for stock items */}
        <table className="table w-full bg-white">
          <thead>
            <tr className='text-black/80'>
              <th>Item ID</th>
              <th>Name</th>
              <th>Stock Level</th>
              <th>Warehouse</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-black/80'>
              <td>#00123</td>
              <td>Raw Material A</td>
              <td>500</td>
              <td>Warehouse 1</td>
              <td><button className="btn btn-sm btn-outline">Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Inventory Alerts */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventory Alerts</h2>
        <div className="alert alert-warning">
          <div>
            <span>Low Stock Alert: Raw Material B is below the threshold (only 10 left).</span>
          </div>
        </div>
      </div>

      {/* Inventory Reports */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventory Reports</h2>
        <button className="btn btn-outline btn-primary">Generate Stock Level Report</button>
      </div>
    </div>
  );
};

export default InventoryManagement;
