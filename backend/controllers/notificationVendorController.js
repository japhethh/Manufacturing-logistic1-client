import asyncHandler from "express-async-handler";
import NotificationVendorModel from "../models/notificationVendorModel.js";
import supplierModel from "../models/supplierModel.js";

const getAllNotification = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userExist = await supplierModel.findById(userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  // Fetch notifications and sort by newest first (descending order)
  const notifications = await NotificationVendorModel.find().sort({
    createdAt: -1,
  }); // Sort by createdAt in descending order
  res.status(200).json(notifications);
});

const updateMarkAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await NotificationVendorModel.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );

  res.status(200).json(notification);
});

export { getAllNotification, updateMarkAsRead };
