import asyncHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";

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

const approveOrders = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.body;
  
  try {
    const order = await purchaseOrderModel.findById(orderId);

    console.log(order)
    if(order){
      return res.status(200).json({success:true, message:"Successfully Debug"})
    }
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = "Approved";
    order.statusHistory.push({
      status: "Approved",
      changedBy: userId,
      changedAt: new Date(),
    });

    await order.save();
    res.status(200).json({ message: "Order approved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

const rejectOrders = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.body;
  try {
    const order = await PurchaseOrder.findById(orderId);

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = "Rejected";
    order.statusHistory.push({
      status: "Rejected",
      changedBy: userId,
      changedAt: new Date(),
    });

    await order.save();
    res.status(200).json({ message: "Order approved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});
export { getUserData, getAllPendingOrders, approveOrders, rejectOrders };
