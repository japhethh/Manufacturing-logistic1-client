import MaterialModel from "../models/materialModel.js";
import NotificationLogisticModel from "../models/notificationLogisticModel.js";
import rawmaterialModel from "../models/rawmaterialModel.js";
import asyncHandler from "express-async-handler";

const requested = asyncHandler(async (req, res) => {
  try {
    const request = await rawmaterialModel.find().populate({
      path: "material.materialId", // Populate materialId
      populate: {
        path: "supplier", // Populate supplier inside materialId
        model: "Supplier", // Ensure you reference the correct model name
      },
    });
    // .populate("material.materialId");
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const fetchPurchaseOrder = asyncHandler(async (req, res) => {});

const newRequested = asyncHandler(async (req, res) => {
  const { requestedBy, material, quantity, priority, unit, notes } = req.body;

  // Check for required fields
  if (!requestedBy || !material || !notes) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (requestedBy, material, quantity, unit, notes) are required.",
    });
  }

  const newRequest = new rawmaterialModel({
    requestedBy,
    material,
    quantity,
    priority,
    unit,
    notes,
  });

  try {
    const save = await newRequest.save();

    res.status(201).json(save);

    const io = req.app.get("socket.io");

    const notificationMessage = `You have a new Rawmaterial ${save._id}`;
    // Notification to logistic
    const newNotification = new NotificationLogisticModel({
      message: notificationMessage,
      requestRawmaterialId: save._id,
      type: "pending",
    });

    await newNotification.save();

    io.emit("logistic-notification", newNotification);
    console.log(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getSpecificId = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract ID from URL parameters

  try {
    // Find the specific raw material request by ID and populate necessary fields
    const rawMaterialRequest = await rawmaterialModel.findById(id).populate({
      path: "material.materialId", // Populate materialId
      populate: {
        path: "supplier", // Populate supplier inside materialId
        model: "Supplier", // Ensure you reference the correct model name
      },
    });

    // If no request is found, send a 404 error
    if (!rawMaterialRequest) {
      return res
        .status(404)
        .json({ message: "Raw material request not found" });
    }

    // Send the found request as a response
    res.status(200).json(rawMaterialRequest);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: err.message });
  }
});

const deleteRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exists = await rawmaterialModel.findById(id);
  if (!exists) {
    return res
      .status(400)
      .json({ success: false, message: "Raw Material Not Found!" });
  }
  await rawmaterialModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body;

  try {
    const updatedRequest = await rawmaterialModel.findByIdAndUpdate(
      id,
      { requestStatus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: updatedRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export {
  requested,
  newRequested,
  fetchPurchaseOrder,
  getSpecificId,
  deleteRequest,
  updateStatus,
};
