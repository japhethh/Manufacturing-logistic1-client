import asyncHandler from "express-async-handler";
import TrackingOrderModel from "../models/trackingOrderModel.js";
import supplierModel from "../models/supplierModel.js";

const getAllTrackingOrders = asyncHandler(async (req, res) => {
  // const { id } = req.params;

  const trackingOrders = await TrackingOrderModel.find()
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  res.status(200).json(trackingOrders);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, deliveryStatus } = req.body;
  const supplierExisting = await supplierModel.findById(userId);
  if (!supplierExisting) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const updatedStatus = await TrackingOrderModel.findByIdAndUpdate(
    id,
    { deliveryStatus },
    { new: true }
  )
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  if (!updatedStatus) {
    return res.status(400).json({ success: false, message: "Update failed" });
  }

  const io = req.app.get("socketio");
  res
    .status(200)
    .json({ success: true, updatedStatus, message: "Updated Successfully" });

  io.emit("updateStatus", updatedStatus);
});

const getSpecificId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const trackingOrder = await TrackingOrderModel.findById(id);
  if (!trackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking Order Id not found!" });
  }

  res.status(200).json({ success: true, data: trackingOrder });
});

export { getAllTrackingOrders, updateStatus, getSpecificId };
