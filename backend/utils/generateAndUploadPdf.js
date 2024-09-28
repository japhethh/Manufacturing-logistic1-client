// utils/generateAndUploadPDF.js
import PDFDocument from "pdfkit";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

const generateAndUploadPDF = async (purchaseOrder) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      // Capture the PDF data as buffers
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const pdfBuffer = Buffer.concat(buffers);

        try {
          // Upload to Cloudinary with correct resource type (raw for non-images)
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "purchase_orders",
              resource_type: "raw", // Correct resource type for PDF
              public_id: `${purchaseOrder.purchaseOrderNumber}`,
              overwrite: true,
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error); // Log Cloudinary error
                return reject(error);
              }
              resolve(result.secure_url);
            }
          );

          // Stream the generated PDF buffer to Cloudinary
          streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
        } catch (uploadError) {
          console.error("Upload Process Error:", uploadError); // Log error in upload process
          reject(uploadError);
        }
      });

      // Generate PDF content
      doc.fontSize(20).text("Purchase Order", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`PO Number: ${purchaseOrder.purchaseOrderNumber}`);
      doc.text(`Supplier: ${purchaseOrder.supplier.supplierName}`);
      doc.text(`Order Date: ${purchaseOrder.orderDate.toDateString()}`);
      doc.text(`Payment Terms: ${purchaseOrder.paymentTerm}`);
      doc.moveDown();

      // Items section in the PDF
      doc.text("Items:", { underline: true });
      purchaseOrder.items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}, Total: $${item.totalPrice}`
        );
      });
      doc.moveDown();

      // Tax and Total Amount
      doc.text(`Tax: $${purchaseOrder.tax}`);
      doc.text(`Total Amount: $${purchaseOrder.totalAmount}`);
      doc.moveDown();

      // Notes section (if available)
      if (purchaseOrder.notes) {
        doc.text(`Notes: ${purchaseOrder.notes}`);
      }

      // Finalize the document (end the stream)
      doc.end();
    } catch (error) {
      console.error("PDF Generation Error:", error); // Log PDF generation errors
      reject(error);
    }
  });
};

export default generateAndUploadPDF;
