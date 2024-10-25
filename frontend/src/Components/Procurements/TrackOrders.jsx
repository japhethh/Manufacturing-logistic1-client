import { useState, useEffect } from "react";

const TrackOrders = () => {
  // Mock data for demonstration purposes
  const [orders, setOrders] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Fetch order tracking data
  useEffect(() => {
    const fetchOrderData = async () => {
      // Replace with API call to fetch order data
      const fetchedOrders = [
        {
          id: 1,
          status: "Pending",
          shipmentTracking: "123ABC",
          expectedDelivery: "2024-09-25",
          communicationLog: [
            { date: "2024-09-15", message: "Order placed" },
            { date: "2024-09-16", message: "Awaiting approval" },
          ],
        },
        {
          id: 2,
          status: "Shipped",
          shipmentTracking: "456DEF",
          expectedDelivery: "2024-09-20",
          communicationLog: [
            { date: "2024-09-14", message: "Order placed" },
            { date: "2024-09-15", message: "Shipped via DHL" },
          ],
        },
      ];

      setOrders(fetchedOrders);

      // Alerts for overdue items
      const overdueAlerts = fetchedOrders
        .filter((order) => new Date(order.expectedDelivery) < new Date())
        .map((order) => `Order ${order.id} is overdue.`);

      setAlerts(overdueAlerts);
    };

    fetchOrderData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Track Orders</h1>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg">Alerts</h2>
          <ul className="list-disc list-inside mt-2">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Order Details */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Order ID: {order.id}
          </h2>
          <p className="text-gray-600">
            Status:{" "}
            <span
              className={`font-bold ${
                order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p className="text-gray-600">
            Shipment Tracking:{" "}
            <a
              href={`https://tracking.example.com/${order.shipmentTracking}`}
              className="text-blue-500 hover:underline"
            >
              {order.shipmentTracking}
            </a>
          </p>
          <p className="text-gray-600">
            Expected Delivery: {order.expectedDelivery}
          </p>

          {/* Communication Log */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Communication Log:</h3>
            <ul className="list-disc list-inside mt-2">
              {order.communicationLog.map((log, index) => (
                <li key={index} className="text-gray-600">
                  <strong>{log.date}:</strong> {log.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackOrders;
