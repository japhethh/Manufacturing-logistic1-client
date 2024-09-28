// Approve Purchase Order

import purchaseOrderModel from "../models/purchaseOrderModel.js";
const approvePurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const purchaseOrder = await purchaseOrderModel
    .findById(id)
    .populate("createdBy")
    .populate("supplier");
  if (!purchaseOrder) {
    return res.status(404).json({ message: "Purchase Order not found." });
  }

  if (purchaseOrder.approvalStatus !== "Pending") {
    return res
      .status(400)
      .json({ message: "Purchase Order has already been processed." });
  }

  purchaseOrder.approvalStatus = "Approved";
  purchaseOrder.orderStatus = "In Process"; // Update order status accordingly
  purchaseOrder.approvalDate = Date.now();

  await purchaseOrder.save();

  // Notify the creator about approval
  await sendEmail({
    to: purchaseOrder.createdBy.email,
    subject: `Your Purchase Order ${purchaseOrder.purchaseOrderNumber} has been Approved`,
    text: `Good news! Your purchase order ${purchaseOrder.purchaseOrderNumber} has been approved by the finance team.`,
  });

  res
    .status(200)
    .json({ message: "Purchase Order approved successfully.", purchaseOrder });
});

// Reject Purchase Order
const rejectPurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rejectionReason } = req.body;

  const purchaseOrder = await purchaseOrderModel
    .findById(id)
    .populate("createdBy")
    .populate("supplier");
  if (!purchaseOrder) {
    return res.status(404).json({ message: "Purchase Order not found." });
  }

  if (purchaseOrder.approvalStatus !== "Pending") {
    return res
      .status(400)
      .json({ message: "Purchase Order has already been processed." });
  }

  if (!rejectionReason) {
    return res.status(400).json({ message: "Rejection reason is required." });
  }

  purchaseOrder.approvalStatus = "Rejected";
  purchaseOrder.orderStatus = "Pending"; // Or another appropriate status
  purchaseOrder.rejectionReason = rejectionReason;
  purchaseOrder.approvalDate = Date.now();

  await purchaseOrder.save();

  // Notify the creator about rejection
  await sendEmail({
    to: purchaseOrder.createdBy.email,
    subject: `Your Purchase Order ${purchaseOrder.purchaseOrderNumber} has been Rejected`,
    text: `Unfortunately, your purchase order ${purchaseOrder.purchaseOrderNumber} has been rejected by the finance team.\n\nReason: ${rejectionReason}`,
  });

  res
    .status(200)
    .json({ message: "Purchase Order rejected successfully.", purchaseOrder });
});

export { approvePurchaseOrder, rejectPurchaseOrder };
