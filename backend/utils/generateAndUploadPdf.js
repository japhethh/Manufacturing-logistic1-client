// utils/generateAndUploadPdf.js
import cloudinary from "../utils/cloudinary.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import streamifier from "streamifier";
import axios from "axios"; // Add axios for fetching the image
import generalSettingsModel from "../models/generalSettingsModel.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Helper function to convert image URL to base64
const getBase64ImageFromURL = async (url) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "binary").toString("base64");
  const mimeType = response.headers["content-type"];
  return `data:${mimeType};base64,${buffer}`;
};

const generateAndUploadPdf = async (purchaseOrder) => {
  const generalSettingsData = await generalSettingsModel.find({});
  const dataOnly = generalSettingsData[0];

  let logoBase64 = null;
  try {
    // Fetch the logo and convert to base64
    logoBase64 = await getBase64ImageFromURL(dataOnly.logo);
  } catch (error) {
    console.error("Error fetching the logo image:", error);
  }

  return new Promise((resolve, reject) => {
    // Define PDFMake document definition
    const docDefinition = {
      content: [
        // Logo Section
        logoBase64
          ? {
              image: logoBase64,
              width: 100,
              alignment: "center",
              margin: [0, 5, 0, 20],
            }
          : {}, // Smaller logo, width set to 100

        // Company Details
        { text: dataOnly.companyName, alignment: "center", style: "subheader" },
        {
          text: dataOnly.companyAddress,
          alignment: "center",
          style: "subheader",
        },
        {
          text: dataOnly.companyPhone,
          alignment: "center",
          style: "subheader",
        },

        // Title
        { text: "Purchase Order", style: "header", margin: [0, 20, 0, 10] },

        // Purchase Order Info
        {
          text: `PO Number: ${purchaseOrder.purchaseOrderNumber}`,
          margin: [0, 5, 0, 5],
        },
        {
          text: `Order Date: ${new Date(
            purchaseOrder.orderDate
          ).toDateString()}`,
          margin: [0, 5, 0, 5],
        },
        {
          text: `Supplier: ${purchaseOrder.supplier.supplierName}`,
          margin: [0, 5, 0, 5],
        },
        {
          text: `Payment Terms: ${purchaseOrder.paymentTerm}`,
          margin: [0, 5, 0, 20],
        },

        // Items Table
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],
            body: [
              [
                { text: "No", bold: true },
                { text: "Item Name", bold: true },
                { text: "Quantity", bold: true },
                { text: "Price", bold: true },
                { text: "Total", bold: true },
              ],
              ...purchaseOrder.items.map((item, index) => [
                `${index + 1}`,
                item.name,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `$${item.totalPrice.toFixed(2)}`,
              ]),
            ],
          },
          margin: [0, 0, 0, 20],
        },

        // Tax and Total Amount
        {
          text: `Tax: $${purchaseOrder.tax.toFixed(2)}`,
          alignment: "right",
          margin: [0, 0, 0, 5],
        },
        {
          text: `Total Amount: $${purchaseOrder.totalAmount.toFixed(2)}`,
          alignment: "right",
          margin: [0, 0, 0, 20],
        },

        // Notes Section
        purchaseOrder.notes
          ? { text: `Notes: ${purchaseOrder.notes}`, margin: [0, 5, 0, 20] }
          : {},

        // Thank You Message and Contact Information
        {
          text: "Thank you for your business!",
          style: "footer",
          margin: [0, 20, 0, 5],
        },
        {
          text: `Contact us: ${dataOnly.companyEmail} | ${dataOnly.companyPhone}`,
          alignment: "center",
          margin: [0, 5, 0, 5],
        },
        { text: dataOnly.companyAddress, alignment: "center" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
        },
        subheader: {
          fontSize: 12,
          alignment: "center",
        },
        footer: {
          fontSize: 10,
          alignment: "center",
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
