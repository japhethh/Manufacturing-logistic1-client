import asyncHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";

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
  const { id } = req.body;

  const exists = await supplierModel.findById(id);

  if (!exists) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const getPendingOrders = exists.purchaseOrders;

  const pending_orders = [];
  getPendingOrders.map((item, index) => {
    if (item === "Pending") {
      pending_orders += item;
      return;
    }
  });

  res.status(200).json({ success: true, pendingOrders: getPendingOrders });
});

export { getUserData, getAllPendingOrders };
