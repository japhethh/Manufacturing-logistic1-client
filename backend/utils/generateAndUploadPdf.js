// utils/generateAndUploadPdf.js
import cloudinary from "../utils/cloudinary.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import streamifier from "streamifier";
import generalSettingsModel from "../models/generalSettingsModel.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;



const generateAndUploadPdf = async (purchaseOrder) => {
  const generalSettingsData = await generalSettingsModel.find({});

  const dataOnly = generalSettingsData[0];
  console.log(dataOnly)
  return new Promise((resolve, reject) => {
    // Define PDFMake document definition
    const docDefinition = {
      content: [
        { text: 'Purchase Order', style: 'header' },
        { text: dataOnly.companyName, alignment: 'center' },
        { text: dataOnly.companyAddress, alignment: 'center' },
        { text: dataOnly.companyPhone, alignment: 'center' },
        { text: `PO Number: ${purchaseOrder.purchaseOrderNumber}` },
        { text: `Supplier: ${purchaseOrder.supplier.supplierName}` },
        { text: `Order Date: ${new Date(purchaseOrder.orderDate).toDateString()}` },
        { text: `Payment Terms: ${purchaseOrder.paymentTerm}` },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'No', bold: true }, { text: 'Item Name', bold: true }, { text: 'Quantity', bold: true }, { text: 'Price', bold: true }, { text: 'Total', bold: true }],
              ...purchaseOrder.items.map((item, index) => [
                `${index + 1}`,
                item.name,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `$${item.totalPrice.toFixed(2)}`,
              ]),
            ],
          },
        },
        { text: `Tax: $${purchaseOrder.tax.toFixed(2)}`, alignment: 'right' },
        { text: `Total Amount: $${purchaseOrder.totalAmount.toFixed(2)}`, alignment: 'right' },
        purchaseOrder.notes ? { text: `Notes: ${purchaseOrder.notes}` } : {},
        { text: "Thank you for your business!", style: 'footer' },
        { text: "Contact us: company@example.com | (123) 456-7890", alignment: 'center' },
        { text: "Address: 123 Main St, City, State, Zip", alignment: 'center' }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
        },
        footer: {
          fontSize: 10,
          alignment: 'center',
        },
      },
    };

    // Create PDFMake PDF
    pdfMake.createPdf(docDefinition).getBuffer(async (buffer) => {
      try {
        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "purchase_orders",
            resource_type: "raw",
            public_id: `${purchaseOrder.purchaseOrderNumber}`,
            format: "pdf",
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              return reject(error);
            }
            console.log("Uploaded PDF URL:", result.secure_url);
            resolve(result.secure_url);
          }
        );

        // Stream the generated PDF buffer to Cloudinary
        streamifier.createReadStream(buffer).pipe(uploadStream);
      } catch (uploadError) {
        console.error("Upload Process Error:", uploadError);
        reject(uploadError);
      }
    });
  });
};

export default generateAndUploadPdf;
