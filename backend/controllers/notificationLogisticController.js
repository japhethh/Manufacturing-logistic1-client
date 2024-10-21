import asyncHandler from "express-async-handler";
import NotificationLogisticModel from "../models/notificationLogisticModel.js";
import userModel from "../models/userModel.js";

const getAllNotification = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userExist = await userModel.findById(userId);

  if (!userExist) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const notifications = await NotificationLogisticModel.find();

  res.status(200).json(notifications);
});

const updateMarkAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await NotificationLogisticModel.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );

  res.status(200).json(notification);
});

export { getAllNotification, updateMarkAsRead };
