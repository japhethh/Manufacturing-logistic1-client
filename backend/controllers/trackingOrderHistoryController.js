import trackingOrderHistoryModel from "../models/trackingOrderHistoryModel.js";
import asyncHandler from "express-async-handler";

const getAllTrackingOrderHistory = asyncHandler(async (req, res) => {
  const trackingOrderHistory = await trackingOrderHistoryModel.find();

  if (!trackingOrderHistory) {
    return res
      .status(400)
      .json({ success: false, message: "No tracking order history found!" });
  }

  res.status(200).json(trackingOrderHistory);
});

export { getAllTrackingOrderHistory };
