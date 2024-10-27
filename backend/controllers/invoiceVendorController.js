import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import TrackingOrderModel from "../models/trackingOrderModel.js";
import NotificationVendorModel from "../models/notificationVendorModel.js";
import generalSettingsModel from "../models/generalSettingsModel.js";

const createInvoice = async (req, res) => {
  const {
    _id,
    supplier,
    items,
    totalAmount,
    paymentDetails,
    issueDate,
    dueDate,
    shippingDetails,
    companyAccount,
    tax,
    notes,
    status,
  } = req.body;

  try {
    // Create new invoice document
    const newInvoice = new Invoice({
      purchaseOrder: _id,
      vendor: supplier._id,
      items: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.totalPrice,
      })),
      totalAmount,
      paymentDetails,
      issueDate,
      dueDate,
      shippingDetails: {
        shippingAddress: {
          address: companyAccount.companyAddress,
          city: companyAccount.companyAddress,
          zipCode: companyAccount.zipCode,
          country: companyAccount.country,
        },
      },
      tax: { taxAmount: tax },
      notes,
      status,
    });

    // Save the invoice document
    await newInvoice.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while creating invoice",
    });
  }
};

// GET ALL INVOICE
const getAllInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const invoices = await Invoice.find({})
    .populate("purchaseOrder")
    .populate("vendor");

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

  const singleInvoice = await purchaseOrderModel
    .findById(id)
    .populate("supplier")
    .populate("companyAccount");
  if (!singleInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  console.log(singleInvoice);
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

// App an invoice
const approveInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const invoiced = await Invoice.findById(id)
      .populate("purchaseOrder")
      .populate("vendor");

    console.log(invoiced);
    if (!invoiced)
      return res.status(404).json({ message: "Invoice not found." });

    // Approve the invoice
    invoiced.approvalStatus = "Approved";
    await invoiced.save();

    const generalSettings = await generalSettingsModel.find();
    if (generalSettings === 0) {
      return res
        .status(400)
        .json({ success: false, message: "General Settings not found!" });
    }

    const general = generalSettings[0];

    const newTrackingOrder = new TrackingOrderModel({
      invoiceId: invoiced._id,
      purchaseOrderId: invoiced.purchaseOrder._id,
      deliveryStatus: "Pending",
      supplier: invoiced.vendor._id,
      invoiceAmount: invoiced.totalAmount,
      purchaseOrderAmount: invoiced.purchaseOrder.totalAmount,
      generalSettings: general,
      // quantityOrdered: invoiced.purchaseOrder.totalAmount,
      // quantityInvoiced: invoiced.quantityInvoiced,
      totalAmount: invoiced.totalAmount,
    });

    const notificationVendor = new NotificationVendorModel({
      user: newTrackingOrder.purchaseOrderId.createdBy,
      supplier: newTrackingOrder.purchaseOrderId.supplier,
      message: `Invoice ${invoiced._id} has been approved.`,
      type: "approved_invoice",
      invoiceId: invoiced._id,
    });

    //I need to notify the

    await newTrackingOrder.save();
    await notificationVendor.save();

    const io = req.app.get("socketio");

    io.emit("invoice-approve", notificationVendor);

    res.status(200).json({ invoiced, newTrackingOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// App an invoice
const rejectInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);
    if (!invoice)
      return res.status(404).json({ message: "Invoice not found." });

    // Reject the invoice
    invoice.approvalStatus = "Rejected";
    await invoice.save();

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  approveInvoice,
  rejectInvoice,
};
