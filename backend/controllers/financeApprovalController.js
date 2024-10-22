import asyncHandler from "express-async-handler";
import financeApprovalModel from "../models/financeApprovalModel.js";
import supplierModel from "../models/supplierModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import NotificationVendorModel from "../models/notificationVendorModel.js";

const getAllFinanceApproval = asyncHandler(async (req, res) => {
  const getData = await financeApprovalModel.find({}).populate("purchaseOrder");

  if (!getData) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  res.status(200).json(getData);
});

const updateFinanceApproval = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updateFinanceApproval = await financeApprovalModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updateFinanceApproval) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  res.status(200).json({ success: true, data: updateFinanceApproval });
});

const approvedFinance = asyncHandler(async (req, res) => {
  const {
    status,
    comments,
    approvalId,
    reason,
    comment,
    totalBudget,
    category,
    documents,
    department,
  } = req.body;
  const { id } = req.params;

  if (
    (!status,
    !comments,
    !approvalId,
    !reason,
    !comment,
    !totalBudget,
    !category,
    !documents,
    !department)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all field" });
  }

  const isApproved = await financeApprovalModel.findOne({ approvalId });

  if (!isApproved) {
    return res
      .status(400)
      .json({ success: false, message: "financeApproval not found" });
  }
  // Check if the current status is already "Approved"
  if (isApproved.status === "Approved") {
    return res.status(400).json({
      success: false,
      message:
        "This approval has already been marked as Approved and cannot be modified again.",
    });
  }
  // Check if the current status is already "Rejected"
  if (isApproved.status === "Rejected") {
    return res.status(400).json({
      success: false,
      message:
        "This approval has already been marked as Rejected and cannot be modified again.",
    });
  }

  const exist = await financeApprovalModel.findById(id).populate({
    path: "purchaseOrder", // Populate the purchase order
    populate: {
      path: "supplier", // Populate the supplier inside the purchase order
      model: "Supplier", // Reference to the Supplier model
    },
  });

  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "Finance not found " });
  }

  const updateFinanceApproval = await financeApprovalModel.findByIdAndUpdate(
    id,
    {
      // approvalId,
      status,
      comments,
      reason,
      comment,
      totalBudget,
      category,
      documents,
      department,
    },
    { new: true }
  );

  if (!updateFinanceApproval) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  // res.status(200).json({ success: true, data: updateFinanceApproval });

  const theSupplier = exist.purchaseOrder.supplier;

  const existSupplier = await supplierModel.findById(theSupplier._id);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  existSupplier.purchaseOrders.push(exist.purchaseOrder);

  await existSupplier.save();

  const io = req.app.get("socketio");

  const purchaseOrderId = await purchaseOrderModel.findById(
    exist.purchaseOrder._id
  );

  console.log(purchaseOrderId);
  io.emit("sendingOrder", purchaseOrderId);
  io.emit("receive-notification", purchaseOrderId, {
    message: "New purchase order received",
  });

  const notificationMessage = `You have a new pending purchase order ${exist.purchaseOrder.purchaseOrderNumber}`;

  const newNotification = new NotificationVendorModel({
    // user: existSupplier._id, // Associate the notification with the supplier/vendor
    purchaseOrder: exist.purchaseOrder._id,
    message: notificationMessage,
    type: "pending", // Adjust type for pending notifications
  });
  await newNotification.save(); // Save the notification to the database

  io.emit("vendor-notification", newNotification);
  console.log(newNotification);

  return res.status(200).json({
    success: true,
    data: existSupplier,
    message: "Successfully Approve by Finance!",
  });
});

// REJECT
const rejectedFinance = asyncHandler(async (req, res) => {
  const {
    status,
    comments,
    approvalId,
    reason,
    comment,
    totalBudget,
    category,
    documents,
    department,
  } = req.body;
  const { id } = req.params;

  if (
    (!status,
    !comments,
    !approvalId,
    !reason,
    !comment,
    !totalBudget,
    !category,
    !documents,
    !department)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all field" });
  }

  const isApproved = await financeApprovalModel.findOne({ approvalId });

  if (!isApproved) {
    return res
      .status(400)
      .json({ success: false, message: "financeApproval not found" });
  }

  // Check if the current status is already "Approved"
  if (isApproved.status === "Approved") {
    return res.status(400).json({
      success: false,
      message:
        "This approval has already been marked as Approved and cannot be modified again.",
    });
  }
  // Check if the current status is already "Rejected"
  if (isApproved.status === "Rejected") {
    return res.status(400).json({
      success: false,
      message:
        "This approval has already been marked as Rejected and cannot be modified again.",
    });
  }

  const exist = await financeApprovalModel.findById(id).populate({
    path: "purchaseOrder", // Populate the purchase order
    populate: {
      path: "supplier", // Populate the supplier inside the purchase order
      model: "Supplier", // Reference to the Supplier model
    },
  });

  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "Finance not found " });
  }

  const updateFinanceApproval = await financeApprovalModel.findByIdAndUpdate(
    id,
    {
      // approvalId,
      status,
      comments,
      reason,
      comment,
      totalBudget,
      category,
      documents,
      department,
    },
    { new: true }
  );

  if (!updateFinanceApproval) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  // res.status(200).json({ success: true, data: updateFinanceApproval });

  const theSupplier = exist.purchaseOrder.supplier;

  const existSupplier = await supplierModel.findById(theSupplier._id);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  existSupplier.purchaseOrders.push(exist.purchaseOrder);

  await existSupplier.save();

  return res.status(200).json({
    success: true,
    data: existSupplier,
    message: "Successfully Approve by Finance!",
  });
});

const pendingFinance = asyncHandler(async (req, res) => {
  const pending = await financeApprovalModel
    .find({ status: "Pending" })
    .populate("purchaseOrder");
  if (!pending) {
    return res
      .status(400)
      .json({ success: false, message: "Pending not found" });
  }

  res.status(200).json({ success: true, pending });
});

export {
  getAllFinanceApproval,
  updateFinanceApproval,
  approvedFinance,
  rejectedFinance,
  pendingFinance,
};
