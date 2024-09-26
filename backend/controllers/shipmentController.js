import shipmentModel from "../models/shipmentModel.js";
import asyncHandler from "express-async-handler";

// FORMAT
// CREATE
// READ
// UPDATE
// DELETE

// CREATE
const createShipment = asyncHandler(async (req, res) => {
  try {
    const {
      purchaseOrder,
      shipmentStatus,
      trackingNumber,
      carrier,
      shippedDate,
      deliveryDate,
      notes,
    } = req.body;

    const shipment = new shipmentModel({
      purchaseOrder,
      shipmentStatus,
      trackingNumber,
      carrier,
      shippedDate,
      deliveryDate,
      notes,
    });

    await shipment.save();

    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ
const getAllShipment = asyncHandler(async (req, res) => {
  const allData = await shipmentModel.find({});

  if (!allData) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment Not Found" });
  }

  res.status(200).json(allData);
});

// UPDATE
const updateShipment = asyncHandler(async (req, res) => {
  const { shipmentStatus } = req.body;
  const { id } = req.params;

  const updateStatus = await shipmentModel.findByIdAndUpdate(
    id,
    {shipmentStatus},
    { new: true }
  );

  if (!updateStatus) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment Not Found" });
  }

  res.status(200).json(updateStatus);
});

// DELETE
const deleteShipment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vdeleteShipment = await shipmentModel.findByIdAndDelete(id);

  if (!vdeleteShipment) {
    return res.status(400).json({ success: false, message: "Not Found" });
  }

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

export { createShipment, getAllShipment, updateShipment, deleteShipment };
