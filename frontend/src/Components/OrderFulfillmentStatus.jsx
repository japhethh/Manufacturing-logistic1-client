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
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Item</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Received</th>
              <th className="py-3 px-4 text-left">Delivered</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.item}</td>
                <td className="py-3 px-4">{order.quantity}</td>
                <td className="py-3 px-4">{order.received}</td>
                <td className="py-3 px-4">{order.delivered ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 space-x-2">
                  {!order.delivered && (
                    <button
                      onClick={() => handleGoodsReceipt(order.id, 5)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Receive 5
                    </button>
                  )}
                  {order.delivered && !order.returnRequested && (
                    <button
                      onClick={() => handleReturnRequest(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Request Return
                    </button>
                  )}
                  <button
                    onClick={() => handleInvoiceMatching(order.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Match Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold mt-6">Supplier Performance</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <p className="text-gray-700 mb-2"><strong>Total Orders:</strong> {performance.totalOrders}</p>
        <p className="text-gray-700 mb-2"><strong>Delivered Orders:</strong> {performance.deliveredOrders}</p>
        <p className="text-gray-700 mb-2"><strong>Return Requests:</strong> {performance.returnRequests}</p>
        <p className="text-gray-700"><strong>Delivery Rate:</strong> {performance.deliveryRate}%</p>
      </div>
    </div>
  );
};

export default OrderFulfillmentStatus;
