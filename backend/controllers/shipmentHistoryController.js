import asyncHandler from "express-async-handler";
import shipmentHistoryModel from "../models/shipmentHistoryModel.js";

// GET
const getAllShipmentHistory = asyncHandler(async (req, res) => {
  const shipmentHistory = await shipmentHistoryModel.find({});

  if (!shipmentHistory) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment History Not Found" });
  }

  res.status(200).json(shipmentHistory);
});

// DELETE
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


// New but decide this if i need to delete this
const createShiptmentHistory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const newShipment = await shipmentHistoryModel.findById(id);

  if (!newShipment) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment History not found" });
  }

  const create = new shipmentHistoryModel({
    // purchaseOrder: purchaseOrder._id,
    shipmentStatus: shipmentStatus,
    trackingNumber: trackingNumber,
    carrier: carrier,
    shippedDate: shippedData,
    deliveryDate: deliveryDate,
    notes: notes,
  });

  await create.save();
});

export { getAllShipmentHistory, deleteShipmentHistory, createShiptmentHistory };
