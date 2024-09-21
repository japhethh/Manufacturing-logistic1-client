    import { useEffect, useState } from "react";
    import axios from "axios";
    import { useParams } from "react-router-dom";
    import { UserContext } from "../context/userContext";
    import { useContext } from "react";
    const PurchaseOrderView = () => {
    const { apiURL } = useContext(UserContext);
    const { purchaseOrderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const response = await axios.get(
            `${apiURL}/api/purchase-order${purchaseOrderId}`
            );
            setOrder(response.data);
        } catch (error) {
            console.error("Failed to fetch order:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchOrder();
    }, [purchaseOrderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
        <div className="border p-4 rounded-md shadow-md">
            <h1 className="text-xl font-bold">Purchase Order</h1>
            <img src={order.logo} alt="Company Logo" className="w-32" />
            <h2 className="text-lg font-semibold">From:</h2>
            <p>{order.companyName}</p>
            <p>{order.address}</p>
            <p>{order.contact}</p>

            <h2 className="text-lg font-semibold mt-4">Requested By:</h2>
            <p>{order.requestedBy}</p>

            <h2 className="text-lg font-semibold mt-4">Items:</h2>
            <table className="w-full border">
            <thead>
                <tr>
                <th className="border">Material Name</th>
                <th className="border">Quantity</th>
                <th className="border">Price Per Unit</th>
                <th className="border">Total Price</th>
                </tr>
            </thead>
            <tbody>
                {order.items.map((item, index) => (
                <tr key={index}>
                    <td className="border">{item.materialName}</td>
                    <td className="border">{item.quantity}</td>
                    <td className="border">{item.pricePerUnit}</td>
                    <td className="border">
                    {(item.quantity * item.pricePerUnit).toFixed(2)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            <h2 className="text-lg font-semibold mt-4">
            Total Amount: ${order.totalAmount.toFixed(2)}
            </h2>
            <h2 className="text-lg font-semibold mt-4">
            Delivery Date: {order.deliveryDate}
            </h2>
            <h2 className="text-lg font-semibold mt-4">
            Payment Terms: {order.paymentTerms}
            </h2>
            <h2 className="text-lg font-semibold mt-4">Order Notes:</h2>
            <p>{order.orderNotes}</p>
        </div>
        </div>
    );
    };

    export default PurchaseOrderView;
