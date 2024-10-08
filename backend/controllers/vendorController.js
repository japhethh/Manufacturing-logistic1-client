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



export { getUserData };
