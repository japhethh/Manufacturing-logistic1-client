import React, { useState } from 'react';

// Simulated data for demonstration purposes
const initialOrders = [
  { id: 1, item: 'Laptop', quantity: 10, received: 0, delivered: false, returnRequested: false },
  { id: 2, item: 'Mouse', quantity: 50, received: 0, delivered: false, returnRequested: false },
];

const OrderFulfillmentStatus = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleGoodsReceipt = (orderId, quantity) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, received: order.received + quantity, delivered: order.received + quantity >= order.quantity }
        : order
    ));
  };

  const handleReturnRequest = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, returnRequested: true }
        : order
    ));
  };

  const handleInvoiceMatching = (orderId) => {
    console.log(`Invoice matched and payment initiated for Order ID: ${orderId}`);
  };

  const calculateSupplierPerformance = () => {
    // Example metrics
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(order => order.delivered).length;
    const returnRequests = orders.filter(order => order.returnRequested).length;
    const deliveryRate = totalOrders ? (deliveredOrders / totalOrders * 100).toFixed(2) : 0;

    return {
      totalOrders,
      deliveredOrders,
      returnRequests,
      deliveryRate,
    };
  };

  const performance = calculateSupplierPerformance();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-2xl font-semibold mb-4">Order Fulfillment Status</h1>
  <div className="overflow-x-auto">
    {/* For larger screens, keep the table layout */}
    <table className="hidden min-w-full bg-white shadow-md rounded-lg border border-gray-200 md:table">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Order ID</th>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Item</th>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Quantity</th>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Received</th>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Delivered</th>
          <th className="py-3 px-4 text-left text-sm md:text-base text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
              No orders found.
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm md:text-base">{order.id}</td>
              <td className="py-3 px-4 text-sm md:text-base">{order.item}</td>
              <td className="py-3 px-4 text-sm md:text-base">{order.quantity}</td>
              <td className="py-3 px-4 text-sm md:text-base">{order.received}</td>
              <td className="py-3 px-4 text-sm md:text-base">{order.delivered ? 'Yes' : 'No'}</td>
              <td className="py-3 px-4 space-x-2 text-sm md:text-base flex flex-col md:flex-row">
                {!order.delivered && (
                  <button
                    onClick={() => handleGoodsReceipt(order.id, 5)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-2 md:mb-0 flex items-center"
                    title="Receive 5 items"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m0 0h4m-4 0H8" />
                    </svg>
                    Receive 5
                  </button>
                )}
                {order.delivered && !order.returnRequested && (
                  <button
                    onClick={() => handleReturnRequest(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mb-2 md:mb-0 flex items-center"
                    title="Request return"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 6l-6-6m6 6l-6-6" />
                    </svg>
                    Request Return
                  </button>
                )}
                <button
                  onClick={() => handleInvoiceMatching(order.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                  title="Match invoice"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 6l-6-6m6 6l-6-6" />
                  </svg>
                  Match Invoice
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    {/* Card layout for mobile */}
    <div className="block md:hidden">
      {orders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Order ID: {order.id}</h2>
              <p className="text-sm">{order.delivered ? 'Delivered' : 'Pending'}</p>
            </div>
            <p className="text-gray-700">Item: {order.item}</p>
            <p className="text-gray-700">Quantity: {order.quantity}</p>
            <p className="text-gray-700">Received: {order.received}</p>
            <div className="flex flex-col mt-4 space-y-2">
              {!order.delivered && (
                <button
                  onClick={() => handleGoodsReceipt(order.id, 5)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                  title="Receive 5 items"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m0 0h4m-4 0H8" />
                  </svg>
                  Receive 5
                </button>
              )}
              {order.delivered && !order.returnRequested && (
                <button
                  onClick={() => handleReturnRequest(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                  title="Request return"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 6l-6-6m6 6l-6-6" />
                  </svg>
                  Request Return
                </button>
              )}
              <button
                onClick={() => handleInvoiceMatching(order.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
                title="Match invoice"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 6l-6-6m6 6l-6-6" />
                </svg>
                Match Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  <h2 className="text-xl font-semibold mt-6">Supplier Performance</h2>
  <div className="bg-white shadow-md rounded-lg p-4 mt-4">
    <p className="text-gray-700 mb-2">
      <strong>Total Orders:</strong> {performance.totalOrders}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Delivered Orders:</strong> {performance.deliveredOrders}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Return Requests:</strong> {performance.returnRequests}
    </p>
    <p className="text-gray-700">
      <strong>Delivery Rate:</strong> {performance.deliveryRate}%
    </p>
  </div>
</div>

  );
};

export default OrderFulfillmentStatus;
