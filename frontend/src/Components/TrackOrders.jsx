import React, { useState, useEffect } from 'react';

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
          status: 'Pending',
          shipmentTracking: '123ABC',
          expectedDelivery: '2024-09-25',
          communicationLog: [
            { date: '2024-09-15', message: 'Order placed' },
            { date: '2024-09-16', message: 'Awaiting approval' },
          ],
        },
        {
          id: 2,
          status: 'Shipped',
          shipmentTracking: '456DEF',
          expectedDelivery: '2024-09-20',
          communicationLog: [
            { date: '2024-09-14', message: 'Order placed' },
            { date: '2024-09-15', message: 'Shipped via DHL' },
          ],
        },
      ];

      setOrders(fetchedOrders);

      // Alerts for overdue items
      const overdueAlerts = fetchedOrders
        .filter(order => new Date(order.expectedDelivery) < new Date())
        .map(order => `Order ${order.id} is overdue.`);
      
      setAlerts(overdueAlerts);
    };

    fetchOrderData();
  }, []);

  return (
    <div className="tracking-orders">
      <h1 className="text-xl font-bold mb-4">Track Orders</h1>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="alert-box bg-red-100 p-4 mb-4 rounded">
          <h2 className="text-red-600 font-semibold">Alerts</h2>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index} className="text-red-500">
                {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Order Details */}
      {orders.map(order => (
        <div key={order.id} className="order-card border p-4 mb-4 rounded shadow-sm">
          <h2 className="font-semibold">Order ID: {order.id}</h2>
          <p>Status: <span className="font-bold">{order.status}</span></p>
          <p>Shipment Tracking: {order.shipmentTracking}</p>
          <p>Expected Delivery: {order.expectedDelivery}</p>

          {/* Communication Log */}
          <div className="communication-log mt-3">
            <h3 className="font-semibold">Communication Log:</h3>
            <ul>
              {order.communicationLog.map((log, index) => (
                <li key={index} className="text-sm">
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
