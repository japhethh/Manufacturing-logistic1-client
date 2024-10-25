import expressAsyncHandler from "express-async-handler";
import TrackingOrderModel from "../models/trackingOrderModel.js";

const getAllTrackingOrders = expressAsyncHandler(async (req, res) => {
  // const { id } = req.params;

  const trackingOrders = await TrackingOrderModel.find()
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId");

  res.status(200).json(trackingOrders);
});

export { getAllTrackingOrders };
