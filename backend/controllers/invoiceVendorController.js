import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";

// CREATE INVOICE
const createInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    invoiceNumber,
    purchaseOrder,
    vendor,
    items,
    totalAmount,
    paymentDetails,
    issueDate,
    dueDate,
    shippingDetails,
    tax,
    notes,
    status,
  } = req.body;

  // Validate required fields
  if (
    !invoiceNumber ||
    !purchaseOrder ||
    !vendor ||
    !items ||
    !Array.isArray(items) || // Ensure items is an array
    items.length === 0 || // Check if items array is not empty
    !totalAmount ||
    !paymentDetails ||
    !issueDate ||
    !dueDate ||
    !shippingDetails ||
    !tax ||
    !status
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required and must not be empty.",
    });
  }

  // Create a new Invoice object
  const invoice = new Invoice({
    invoiceNumber,
    purchaseOrder,
    vendor,
    items,
    totalAmount,
    paymentDetails,
    issueDate,
    dueDate,
    shippingDetails,
    tax,
    notes,
    status,
  });

  try {
    const createdInvoice = await invoice.save();
    res.status(201).json({
      success: true,
      message: "Invoice created successfully!",
      invoice: createdInvoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating invoice",
      error: error.message,
    });
  }
});

// GET ALL INVOICE
const getAllInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const invoices = await Invoice.find({});

  if (!invoices) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  res.status(200).json({ success: true, invoices });
});

const getSingleInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  const singleInvoice = await Invoice.findById(id);

  if (!singleInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  res.status(200).json({ success: true, singleInvoice });
});

// Update Invoice
const updateInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  res.status(200).json({ success: true, message: "Successfully Update" });
});

const deleteInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const deletedInvoice = await Invoice.findByIdAndDelete(id);
  if (!deletedInvoice) {
    res.status(400).json({ success: false, message: "Invoice not found" });
  }

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});
export {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
};
