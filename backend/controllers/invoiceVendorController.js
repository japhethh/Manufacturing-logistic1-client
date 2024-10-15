import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";
import purchaseOrderModel from '../models/purchaseOrderModel.js'

// CREATE INVOICE
const createInvoice = async (req, res) => {
  try {
    // Fetch the last created invoice by sorting invoices by creation date in descending order
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    // Generate new invoice number
    let newInvoiceNumber;
    if (lastInvoice) {
      // Extract the number part from the last invoice (assuming a simple numeric format)
      const lastInvoiceNumber = parseInt(lastInvoice.invoiceNumber);
      newInvoiceNumber = (lastInvoiceNumber + 1).toString();
    } else {
      // If no invoice exists, start with 1
      newInvoiceNumber = "1";
    }

    // Create new invoice with the incremented invoice number
    const newInvoice = new Invoice({
      invoiceNumber: newInvoiceNumber,
      purchaseOrder: req.body.purchaseOrder,
      vendor: req.body.vendor,
      
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentDetails: req.body.paymentDetails,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
      shippingDetails: req.body.shippingDetails,
      tax: req.body.tax,
      notes: req.body.notes,
      status: req.body.status,
    });

    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


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


// GET SINGLE ID
const getSingleInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const singleInvoice = await purchaseOrderModel.findById(id).populate("supplier");
  if (!singleInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  console.log(singleInvoice)
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
