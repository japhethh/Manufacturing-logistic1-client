import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const ViewPurchaseOrder = () => {
  const { id } = useParams();
  const { apiURL, token } = useContext(UserContext);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/purchase-order/${id}`, {
          headers: { token: token },
        });
        setPurchaseOrder(response.data);
      } catch (error) {
        console.error("Error fetching purchase order:", error);
        setError("Failed to fetch purchase order.");
      } finally {
        setLoading(false); 
      }
    };

    fetchPurchaseOrder();
  }, [id, apiURL, token]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const logo = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"; 

    doc.setFontSize(12);
    doc.text("Your Company Name", 10, 40);
    doc.text("1234 Company Address St.", 10, 45);
    doc.text("City, State, Zip", 10, 50);
    doc.text("Email: contact@yourcompany.com", 10, 55);
    doc.text("Phone: (123) 456-7890", 10, 60);

    doc.addImage(logo, 'PNG', 150, 40, 50, 20);
    doc.text("Date: " + new Date().toLocaleDateString(), 150, 70);

    doc.setFontSize(14);
    doc.text("Supplier:", 10, 70);
    doc.setFontSize(12);
    doc.text(purchaseOrder.supplier.supplierName, 10, 80);
    doc.text(`${purchaseOrder.supplier.address.street}, ${purchaseOrder.supplier.address.city}, ${purchaseOrder.supplier.address.state}, ${purchaseOrder.supplier.address.zipCode}`, 10, 85);
    doc.text(`Contact Email: ${purchaseOrder.supplier.contactEmail}`, 10, 90);
    doc.text(`Contact Phone: ${purchaseOrder.supplier.contactPhone}`, 10, 95);

    doc.setFontSize(16);
    doc.text(`Purchase Order #${purchaseOrder.purchaseOrderNumber}`, 10, 110);

    const items = purchaseOrder.items.map(item => [item.name, item.quantity, item.price, item.totalPrice]);
    doc.autoTable({
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: items,
      startY: 120,
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 10 },
    });

    doc.text(`Subtotal: $${purchaseOrder.totalAmount}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Notes: ${purchaseOrder.notes}`, 10, doc.autoTable.previous.finalY + 20);
    doc.text(`Payment Term: ${purchaseOrder.paymentTerm}`, 10, doc.autoTable.previous.finalY + 30);

    doc.save(`PurchaseOrder_${purchaseOrder.purchaseOrderNumber}.pdf`);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button onClick={generatePDF} className="btn btn-primary mb-4">Generate PDF</button>
      <h1 className="text-2xl font-bold mb-2">Purchase Order #{purchaseOrder.purchaseOrderNumber}</h1>
      <p className="font-semibold">Supplier: {purchaseOrder.supplier.supplierName}</p>
      <p><strong>Order Date:</strong> {new Date(purchaseOrder.orderDate).toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <table className="min-w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr>
            {['Item', 'Quantity', 'Price', 'Total'].map((header) => (
              <th key={header} className="border border-gray-300 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {purchaseOrder.items.map((item, index) => (
            <tr key={index}>
              {['name', 'quantity', 'price', 'totalPrice'].map((key) => (
                <td key={key} className="border border-gray-300 px-4 py-2">
                  {key === 'price' || key === 'totalPrice' ? `$${item[key].toFixed(2)}` : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="font-semibold mt-4"><strong>Subtotal:</strong> ${purchaseOrder.totalAmount.toFixed(2)}</p>
      <p className="font-semibold"><strong>Notes:</strong> {purchaseOrder.notes}</p>
      <p className="font-semibold"><strong>Payment Term:</strong> {purchaseOrder.paymentTerm}</p>
    </div>
  );
};

export default ViewPurchaseOrder;
