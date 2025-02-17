import asyncHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";

const getUserData = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await supplierModel.findById(userId).populate("purchaseOrders");

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, data: user });
});

// Pending Orders
const getAllPendingOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const supplier = await supplierModel.findById(userId).populate({
    path: "purchaseOrders",
    match: { orderStatus: "Pending" },
  });

  if (!supplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  res.status(200).json({
    success: true,
    data: supplier,
    pendingOrders: supplier.purchaseOrders,
  });
});

const getAllReceivingOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const supplier = await supplierModel.findById(userId).populate({
    path: "purchaseOrders",
    match: { orderStatus: "Approved" },
  });

  if (!supplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  res.status(200).json({
    success: true,
    data: supplier,
    receivingOrders: supplier.purchaseOrders,
  });
});

const getAllCompleteOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const supplier = await supplierModel.findById(userId).populate({
    path: "purchaseOrders",
    match: { orderStatus: "Completed" },
  });

  if (!supplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  res.status(200).json({
    success: true,
    data: supplier,
    completeOrders: supplier.purchaseOrders,
  });
});

const getAllRejectedOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const supplier = await supplierModel.findById(userId).populate({
    path: "purchaseOrders",
    match: { orderStatus: "Rejected" },
  });

  if (!supplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  res.status(200).json({
    success: true,
    data: supplier,
    rejectedOrders: supplier.purchaseOrders,
  });
});

const approveOrders = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { userId, status } = req.body;

  const order = await purchaseOrderModel.findById(orderId);

  if (!order) {
    return res
      .status(400)
      .json({ success: false, message: "purchase id is not found" });
  }

  console.log(order);
  const user = await supplierModel.findById(userId);

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User id is not found" });
  }

  order.orderStatus = "Approved";
  order.statusHistory.push({
    status: order.orderStatus,
    changedBy: userId,
    changedAt: new Date(),
    newStatus: "Approved",
    statusType: "orderStatus",
  });

  await order.save();

  const newAuditLog = new AuditSupplierLog({
    eventTypes: status,
    entityType: "PurchaseOrder",
    entityId: orderId,
    changes: {
      oldValue: user,
      newValue: order,
    },
    performeBy: userId,
    role: user?.role,
  });

  await newAuditLog.save();
  console.log(order.orderStatus);

  res.status(200).json({ message: "Order approved successfully." });

  // res.status(200).json({ success: true, message: "tangina mo kaaaaaa" });
});

const rejectOrders = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { userId, reason, status } = req.body;

  const order = await purchaseOrderModel.findById(orderId);

  if (!order) {
    return res
      .status(400)
      .json({ success: false, message: "purchase id is not found" });
  }

  const user = await supplierModel.findById(userId);

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User id is not found" });
  }

  order.orderStatus = "Rejected";
  order.rejectionReason = reason;
  order.statusHistory.push({
    status: order.orderStatus,
    changedBy: userId,
    changedAt: new Date(),
    newStatus: "Rejected",
    statusType: "orderStatus",
  });

  await order.save();

  const newAuditLog = new AuditSupplierLog({
    eventTypes: status,
    entityType: "PurchaseOrder",
    entityId: order._id,
    changes: {
      oldValue: user,
      newValue: order,
    },
    performeBy: userId,
    role: user?.role,
  });

  await newAuditLog.save();
  console.log(order.orderStatus);

  res.status(200).json({ message: "Order approved successfully." });
});

export {
  getUserData,
  getAllPendingOrders,
  getAllReceivingOrders,
  getAllRejectedOrders,
  approveOrders,
  rejectOrders,
  getAllCompleteOrders,
};
