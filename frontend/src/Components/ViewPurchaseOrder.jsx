import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "jspdf-autotable";
const ViewPurchaseOrder = () => {
  const { id } = useParams();
  const { apiURL, token } = useContext(UserContext);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [generalSettingsData, setGeneralSettingsData] = useState(null);
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
    fetchGeneralSettings();
  }, [id, apiURL, token]);

  const fetchGeneralSettings = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/generalSettings/getAllGeneralSettings`,
        { headers: { token: token } }
      );

      if (!response.data.success) {
        toast.error("Not Found");
      }

      setGeneralSettingsData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(generalSettingsData);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define some styling settings
    const marginX = 10;
    const marginY = 40;
    const lineSpacing = 7;
    const sectionGap = 15;
    const tableStartY = 120;

    const companyData = generalSettingsData[0]; // Assuming you have a single general setting entry
    const { companyName, companyEmail, companyAddress, companyPhone, logo } =
      companyData;
    // Add company logo and header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PURCHASE ORDER", marginX, marginY - 10);

    doc.addImage(logo, "PNG", 150, marginY - 20, 50, 20); // Align logo on the right
    
    // doc.text("City, State, Zip", marginX, marginY + 2 * lineSpacing);

    // Add company information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${companyName}`, marginX, marginY);
    doc.text(`${companyAddress}`, marginX, marginY + lineSpacing);
    doc.text(companyEmail, marginX, marginY + 2 * lineSpacing);
    doc.text(`Phone: ${companyPhone}`, marginX, marginY + 3 * lineSpacing);
    // doc.text(`Phone: ${companyPhone}`, marginX, marginY + 4 * lineSpacing);
    doc.text(
      "Date: " + new Date().toLocaleDateString(),
      150,
      marginY + 4 * lineSpacing
    );

    // Draw a line between the header and the rest of the document
    doc.line(
      marginX,
      marginY + 5 * lineSpacing + 5,
      200,
      marginY + 5 * lineSpacing + 5
    );

    // Add supplier information
    const supplierStartY = marginY + 5 * lineSpacing + sectionGap;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Supplier Information", marginX, supplierStartY);

    doc.setFontSize(12); // Consistent font size for supplier info
    doc.setFont("helvetica", "normal");
    doc.text(
      `Supplier: ${purchaseOrder.supplier.supplierName}`,
      marginX,
      supplierStartY + lineSpacing
    );
    doc.text(
      `${purchaseOrder.supplier.address.street}, ${purchaseOrder.supplier.address.city}, ${purchaseOrder.supplier.address.state}, ${purchaseOrder.supplier.address.zipCode}`,
      marginX,
      supplierStartY + 2 * lineSpacing
    );
    doc.text(
      `Email: ${purchaseOrder.supplier.contactEmail}`,
      marginX,
      supplierStartY + 3 * lineSpacing
    );
    doc.text(
      `Phone: ${purchaseOrder.supplier.contactPhone}`,
      marginX,
      supplierStartY + 4 * lineSpacing
    );

    // Add Purchase Order details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Purchase Order #: ${purchaseOrder.purchaseOrderNumber}`,
      130,
      supplierStartY
    );
    doc.text(
      "Order Date: " + new Date(purchaseOrder.orderDate).toLocaleDateString(),
      150,
      supplierStartY + lineSpacing
    );

    // Add Items table
    const items = purchaseOrder.items.map((item) => [
      item.name,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${item.totalPrice.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["Item", "Quantity", "Price", "Total"]],
      body: items,
      startY: tableStartY,
      theme: "striped",
      styles: { fillColor: [220, 220, 220], fontSize: 12 }, // Increase font size for better readability
      margin: { top: 10, bottom: 10, left: marginX, right: marginX }, // Adjust margins
      tableWidth: "auto", // Allow the table to adjust to the content width
      columnStyles: {
        0: { cellWidth: 50 }, // Adjust the width of the Item column
        1: { cellWidth: 40 }, // Adjust the width of the Quantity column
        2: { cellWidth: 50 }, // Adjust the width of the Price column
        3: { cellWidth: 50 }, // Adjust the width of the Total column
      },
    });

    // Subtotal, notes, and payment terms section
    const finalY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Subtotal: $${purchaseOrder.totalAmount.toFixed(2)}`,
      marginX,
      finalY
    );

    doc.text("Notes:", marginX, finalY + lineSpacing);
    doc.setFont("helvetica", "normal");
    doc.text(purchaseOrder.notes || "None", marginX, finalY + 2 * lineSpacing);

    doc.setFont("helvetica", "bold");
    doc.text("Payment Terms:", marginX, finalY + 3 * lineSpacing);
    doc.setFont("helvetica", "normal");
    doc.text(
      purchaseOrder.paymentTerm || "Not specified",
      marginX,
      finalY + 4 * lineSpacing
    );

    // Draw a line before the footer
    doc.line(marginX, finalY + 5 * lineSpacing, 200, finalY + 5 * lineSpacing);

    // Footer (optional)
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Thank you for your business!",
      100,
      finalY + 6 * lineSpacing,
      null,
      null,
      "center"
    );

    // Save the PDF
    doc.save(`PurchaseOrder_${purchaseOrder.purchaseOrderNumber}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };
  const handleEdit = () => {
    navigate(`/purchase_orders/manage_po/${id}`);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md container px-9 mx-auto">
      <div className="flex gap-4 mb-4">
        <button onClick={generatePDF} className="btn btn-primary">
          Generate PDF
        </button>
        <button onClick={handlePrint} className="btn btn-secondary">
          Print
        </button>
        <button onClick={handleEdit} className="btn btn-secondary">
          Edit
        </button>
      </div>

      {purchaseOrder && (
        <div className="printable">
          {/* Only this will be printed */}
          {generalSettingsData.map((item, index) => (
            <div key={index} className="flex gap-2 justify-between">
              <div>
                <div>
                  <h1>{item.companyName}</h1>
                  <h1>{item.companyEmail}</h1>
                  <h1>{item.companyAddress}</h1>
                </div>
              </div>
              <div>
                <img width={130} src={item.logo} alt="Company Logo" />
              </div>
            </div>
          ))}
          <div className="flex gap-2 justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Vendor</h1>
              <h1 className="text-md">{purchaseOrder.supplier.supplierName}</h1>
              <h1 className="text-md">
                {purchaseOrder.supplier.address.street}
              </h1>
              <h1 className="text-md">{purchaseOrder.supplier.contactPhone}</h1>
              <h1 className="text-md">{purchaseOrder.supplier.contactEmail}</h1>
            </div>

            <div className="flex-1 text-right">
              <h1 className="text-lg">{purchaseOrder.purchaseOrderNumber}</h1>
              <h1 className="text-lg">
                Order Date:{" "}
                {new Date(purchaseOrder.orderDate).toLocaleDateString()}
              </h1>
            </div>
          </div>
          <div className="mt-2">
            <div className="overflow-x-auto">
              <table className="table table-lg">
                <thead className="bg-gray-500 text-base-200">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.items.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.discount}%</td>
                      <td>${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="flex-1">
                <h1 className="font-semibold text-md">Notes</h1>
                <h1 className="text-md">{purchaseOrder.notes}</h1>
              </div>
              <div className="flex-1 text-right">
                <h1 className="font-semibold text-md">Status</h1>
                <button
                  className={`px-3 py-2 rounded-lg ${
                    purchaseOrder.approvalStatus === "Approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-base-100`}
                >
                  {purchaseOrder.approvalStatus}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPurchaseOrder;
