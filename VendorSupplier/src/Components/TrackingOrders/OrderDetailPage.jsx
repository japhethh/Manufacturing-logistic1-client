// OrderDetailPage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../context/verifyStore";
import { toast } from "react-toastify";
import verifyStore from "../../context/verifyStore";

const OrderDetailPage = () => {
  const { token } = verifyStore();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/trackingOrders/getSpecificId/${orderId}`,
          { headers: { token: token } }
        );
        setOrderDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  const stages = [
    { label: "Order Placed", date: orderDetails.createdAt, completed: true },
    {
      label: "Payment Info Confirmed",
      date: orderDetails.updatedAt,
      completed: true,
    },
    {
      label: "Order Shipped Out",
      date: orderDetails.shippingDate,
      completed:
        orderDetails.deliveryStatus === "In Transit" ||
        orderDetails.deliveryStatus === "Delivered",
    },
    {
      label: "Order Received",
      date: orderDetails.receivedDate,
      completed: orderDetails.deliveryStatus === "Delivered",
    },
    {
      label: "Order Completed",
      date: orderDetails.completedDate,
      completed: orderDetails.deliveryStatus === "Delivered",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Order ID: {orderId}</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Order Timeline</h3>
        <div className="flex flex-col items-center">
          {stages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center mb-4">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 ${
                    stage.completed ? "border-green-500" : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {stage.completed ? "✔️" : "❌"}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={`border-t-2 ${
                      stage.completed ? "border-green-500" : "border-gray-300"
                    } flex-grow`}
                  ></div>
                )}
              </div>
              <span className="text-center">{stage.label}</span>
              <span className="text-sm text-gray-500">
                {stage.date ? new Date(stage.date).toLocaleDateString() : "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
