import asyncHandler from "express-async-handler";
import NotificationLogisticModel from "../models/notificationLogisticModel.js";
import userModel from "../models/userModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";

const getAllNotification = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  // const userExist = await userModel.findById(userId);

  // if (!userExist) {
  //   return res.status(400).json({ success: false, message: "User not found" });
  // }

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
