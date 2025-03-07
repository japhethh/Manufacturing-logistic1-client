import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import TrackingOrderModel from "../models/trackingOrderModel.js";
import NotificationVendorModel from "../models/notificationVendorModel.js";
import generalSettingsModel from "../models/generalSettingsModel.js";
import Counter from "../models/Counter.js";
import userModel from "../models/userModel.js";
import supplierModel from "../models/supplierModel.js";
import expressAsyncHandler from "express-async-handler";
import NotificationLogisticModel from "../models/notificationLogisticModel.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";

const createInvoice = expressAsyncHandler(async (req, res) => {
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
    userId,
  } = req.body;

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      {
        _id: "invoiceNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      { new: true, upsert: true }
    );

    const invoiceNumber = counter.sequence_value.toString().padStart(3, "0");

    const reference = `INV-${invoiceNumber}`;

    // Create new invoice document
    const newInvoice = new Invoice({
      invoiceNumber: reference,
      items: items.map((item) => ({
        product: item.productId,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        // New properties
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      purchaseOrder: _id,
      vendor: supplier._id,
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

    const newAuditLog = new AuditSupplierLog({
      eventTypes: "Create",
      entityType: "Invoice",
      entityId: newInvoice.id,
      changes: {
        oldValue: null,
        newValue: newInvoice,
      },
      performeBy: userId,
      role: existSupplier?.role,
    });

    await newAuditLog.save();

    const updateStatus = await purchaseOrderModel.findByIdAndUpdate(
      _id,
      {
        orderStatus: "Completed",
      },
      {
        new: true,
      }
    );

    if (!updateStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase Order not found!" });
    }

    const trackingCounter = await Counter.findByIdAndUpdate(
      {
        _id: "trackingOrderNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const trackingOrderNumber = trackingCounter.sequence_value
      .toString()
      .padStart(3, "0");

    const referenceNumber = `TRK-${trackingOrderNumber}`;

    const generalSettings = await generalSettingsModel.find();
    if (generalSettings === 0) {
      return res
        .status(400)
        .json({ success: false, message: "General Settings not found!" });
    }

    const general = generalSettings[0];

    const existInvoiceId = await Invoice.findById(newInvoice).populate(
      "purchaseOrder"
    );

    if (!existInvoiceId) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice Id not found" });
    }
    const newTrackingOrder = new TrackingOrderModel({
      trackingOrderNumber: referenceNumber,
      invoiceId: newInvoice._id,
      purchaseOrderId: existInvoiceId.purchaseOrder,
      deliveryStatus: "Pending",
      supplier: newInvoice.vendor._id,
      // quantityOrdered:
      // quantityInvoiced:invoiced.
      invoiceAmount: newInvoice.totalAmount,
      purchaseOrderAmount: existInvoiceId.purchaseOrder.totalAmount,
      generalSettings: general,
      totalAmount: newInvoice.totalAmount,
    });

    await newTrackingOrder.save();

    console.log(newTrackingOrder);

    const notificationVendor = new NotificationLogisticModel();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating invoice",
    });
  }
});

const createVendorInvoice = asyncHandler(async (req, res) => {
  const {
    customer,
    userId,
    items,
    totalAmount,
    paymentMethod,
    paymentDate,
    dueDate,
    // tax,
    discount,
    notes,
    status,
    shippingCharges,
  } = req.body;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const counter = await Counter.findByIdAndUpdate(
    { _id: "invoiceNumber" },
    { $inc: { sequence_value: 1 } },
    { new: true }
  );

  const invoiceNumber = counter.sequence_value.toString().padStart(3, "0");
  const reference = `INV-${invoiceNumber}`;

  const index1 = await generalSettingsModel.find({});
  const companyAccount = index1[0];

  const newInvoice = new Invoice({
    invoiceNumber: reference,
    vendor: userId,
    logisticCustomer: customer,
    items: items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    })),
    totalAmount,
    paymentDetails: {
      paymentMethod: paymentMethod,
      paymentDate: paymentDate,
    },
    issueDate: new Date(),
    dueDate,
    shippingDetails: {
      shippingAddress: {
        address: companyAccount.companyAddress,
        city: companyAccount.city,
        zipCode: companyAccount.zipCode,
        country: companyAccount.country,
      },
    },
    // tax: { taxAmount: tax.taxAmount },
    discount,
    notes,
    status,
    shippingCharges,
  });

  await newInvoice.save();

  res.status(201).json({
    success: true,
    message: "Created Successfully!",
    data: newInvoice,
  });
});

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

// GET ALL INVOICE
const getVendorAllInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const invoices = await Invoice.find({ vendor: existing._id })
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

  const existInvoice = await Invoice.findById(id);

  if (!existInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice not found" });
  }

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Update",
    entityType: "Invoice",
    entityId: existInvoice.id,
    changes: {
      oldValue: existInvoice,
      newValue: updatedInvoice,
    },
    performeBy: userId,
    role: exist?.role,
  });

  await newAuditLog.save();

  res.status(200).json({ success: true, message: "Successfully Update" });
});

const deleteInvoice = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existInvoice = await Invoice.findById(id);
  if (!existInvoice) {
    return res
      .status(400)
      .json({ success: false, message: "Invoice id not found!" });
  }

  const deletedInvoice = await Invoice.findByIdAndDelete(id);
  if (!deletedInvoice) {
    res.status(400).json({ success: false, message: "Invoice not found" });
  }
  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Delete",
    entityType: "Invoice",
    entityId: existInvoice.id,
    changes: {
      oldValue: existInvoice,
      newValue: deletedInvoice,
    },
    performeBy: userId,
    role: exist?.role,
  });

  await newAuditLog.save();

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

    const counter = await Counter.findByIdAndUpdate(
      {
        _id: "trackingOrderNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const trackingOrderNumber = counter.sequence_value
      .toString()
      .padStart(3, "0");

    const reference = `TRK-${trackingOrderNumber}`;

    const newTrackingOrder = new TrackingOrderModel({
      trackingOrderNumber: reference,
      invoiceId: invoiced._id,
      purchaseOrderId: invoiced.purchaseOrder._id,
      deliveryStatus: "Pending",
      supplier: invoiced.vendor._id,
      // quantityOrdered:
      // quantityInvoiced:invoiced.
      invoiceAmount: invoiced.totalAmount,
      purchaseOrderAmount: invoiced.purchaseOrder.totalAmount,
      generalSettings: general,
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
    io.emit("updateInvoiceApprove", invoiced);

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

const paymentUpdate = asyncHandler(async (req, res) => {
  try {
    const { description, status, userId } = req.body;
    const { id } = req.params;

    // Check if required fields are provided
    if (!description || !status || !userId || !id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    // Check if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Update the invoice status and description
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { status, description },
      { new: true }
    );

    if (!updatedInvoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found!" });
    }

    // Send a successful response with updated data
    res.status(200).json({ success: true, data: updatedInvoice });
  } catch (error) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
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
  paymentUpdate,
  getVendorAllInvoice,
  createVendorInvoice,
};
