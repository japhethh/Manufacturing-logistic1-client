import asyncHandler from "express-async-handler";
import shipmentHistoryModel from "../models/shipmentHistoryModel.js";

const getAllShipmentHistory = asyncHandler(async (req, res) => {
  const shipmentHistory = await shipmentHistoryModel.find({});

  if (!shipmentHistory) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment History Not Found" });
  }

  res.status(200).json(shipmentHistory);
});

const deleteShipmentHistory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const shipmentHistory = await shipmentHistoryModel.findByIdAndDelete(id);

    if (!shipmentHistory) {
      return res
        .status(400)
        .json({ success: false, message: "Shipment History Not Found!" });
    }

    res.status(200).json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export { getAllShipmentHistory, deleteShipmentHistory };
