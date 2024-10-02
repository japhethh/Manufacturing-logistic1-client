const OrdersVendor = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Orders</h1>

      {/* Vendor Order Creation */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create New Purchase Order
        </h2>
        {/* Order Creation Form */}
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Vendor Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter vendor name"
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Item</span>
            </label>
            <input
              type="text"
              placeholder="Enter item details"
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Submit Order
          </button>
        </form>
      </div>

      {/* Order Tracking */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Track Orders
        </h2>
        <table className="table w-full">
          <thead className="text-black/80">
            <tr>
              <th>Order ID</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* Example of an order row */}
            <tr>
              <td>#12345</td>
              <td>Vendor ABC</td>
              <td>
                <span className="badge badge-info">In Progress</span>
              </td>
              <td>
                <button className="border border-violet-400 text-violet-400 rounded-full hover:text-black hover:bg-violet-300 duration-200 font-semibold btn-sm">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Fulfillment */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order Fulfillment Status
        </h2>
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-primary text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: "60%" }}
          >
            60% Fulfilled
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order History
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-black/80">
                <th>Order ID</th>
                <th>Vendor</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="text-black">
              <tr>
                <td>#12222</td>
                <td>Vendor XYZ</td>
                <td>
                  <span className="badge badge-success">Completed</span>
                </td>
                <td>2024-09-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Communication */}
      <div className="mb-8 card shadow-lg bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Vendor Communication
        </h2>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary">
            Order #12345 has been shipped!
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-secondary">
            Thanks for the update!
          </div>
        </div>
        <input
          type="text"
          placeholder="Send a message..."
          className="input input-bordered w-full mt-4 bg-gray-50"
        />
      </div>
    </div>
  );
};

export default OrdersVendor;
