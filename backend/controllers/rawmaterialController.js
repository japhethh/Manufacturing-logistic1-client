import Counter from "../models/Counter.js";
import MaterialModel from "../models/materialModel.js";
import NotificationLogisticModel from "../models/notificationLogisticModel.js";
import rawmaterialModel from "../models/rawmaterialModel.js";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import { ensureShape } from "@tensorflow/tfjs";
import AuditLog from "../models/auditLogisiticModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";

const requested = asyncHandler(async (req, res) => {
  try {
    const request = await rawmaterialModel.find().populate({
      path: "material.materialId", // Populate materialId
      populate: {
        path: "supplier", // Populate supplier inside materialId
        model: "Supplier", // Ensure you reference the correct model name
      },
    });

    if (!request) {
      return res
        .status(400)
        .json({ success: false, message: "Material not found" });
    }
    // .populate("material.materialId");
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const fetchPurchaseOrder = asyncHandler(async (req, res) => {});

const newRequested = asyncHandler(async (req, res) => {
  const {
    requestedBy,
    material,
    quantity,
    priority,
    unit,
    notes,
    department,
    approvalId,
    rawmaterialId,
    coreId,
  } = req.body;

  // Check for required fields
  if (!requestedBy || !material || !notes || !department || !approvalId) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (requestedBy, material, quantity, unit, notes, department, approvalId) are required.",
    });
  }

  const counter = await Counter.findByIdAndUpdate(
    {
      _id: "rawmaterialNumber",
    },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const rawmaterialNumber = counter.sequence_value.toString().padStart(3, "0");

  const reference = `RAWMATERIAL-${rawmaterialNumber}`;

  const newRequest = new rawmaterialModel({
    rawmaterialNumber: reference,
    requestedBy,
    material,
    quantity,
    priority,
    unit,
    notes,
    department,
    approvalId,
    rawmaterialId,
    coreId,
  });

  try {
    const save = await newRequest.save();

    res
      .status(201)
      .json({ success: true, message: "Successfully Created!", data: save });

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

const approvePurchaseRequisition = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userId, status } = req.body;

  if (!userId || !status) {
    return res
      .status(404)
      .json({ success: false, message: "Required to fill all!" });
  }

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const exist = accountData.find((a) => a._id === userId);

  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  const existRawmaterial = await rawmaterialModel.findById(id);

  if (!existRawmaterial) {
    return res
      .status(404)
      .json({ success: false, message: "Raw material not found!" });
  }

  if (existRawmaterial?.requestStatus === "Approved") {
    return res
      .status(400)
      .json({ success: false, message: "This request is already approved!" });
  }

  const newAuditLog = new AuditLog({
    eventTypes: status,
    entityType: "RawmaterialRequest",
    entityId: id,
    changes: {
      oldValue: existRawmaterial.requestStatus,
      newValue: status,
    },
    performeBy: userId,
    role: exist.role,
  });

  await newAuditLog.save();

  const updatedStatus = await rawmaterialModel.findByIdAndUpdate(id, {
    approvedBy: userId,
    requestStatus: status,
  });

  if (!updatedStatus) {
    return res
      .status(404)
      .json({ success: false, message: "Raw material not found!" });
  }

  // APIENDPOINT NG CORE 1

  res.status(200).json({
    success: true,
    message: "Successfully Approve!",
    data: updatedStatus,
  });
});

const rejectPurchaseRequisition = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userId, status } = req.body;

  console.log(userId);
  console.log(status);
  if (!userId || !status) {
    return res
      .status(404)
      .json({ success: false, message: "Required to fill all!" });
  }

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const exist = accountData.find((a) => a._id === userId);

  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }
  // const exist = await userModel.findById(userId);

  // if (!exist) {
  //   return res.status(404).json({ success: false, message: "User not found!" });
  // }
  const existRawmaterial = await rawmaterialModel.findById(id);

  if (!existRawmaterial) {
    return res
      .status(404)
      .json({ success: false, message: "Raw material not found!" });
  }

  const newAuditLog = new AuditLog({
    eventTypes: status,
    entityType: "RawmaterialRequest",
    entityId: id,
    changes: {
      oldValue: existRawmaterial.requestStatus,
      newValue: status,
    },
    performeBy: userId,
    role: exist.role,
  });

  await newAuditLog.save();

  const updatedStatus = await rawmaterialModel.findByIdAndUpdate(id, {
    approvedBy: userId,
    requestStatus: status,
  });

  if (!updatedStatus) {
    return res
      .status(404)
      .json({ success: false, message: "Raw material not found!" });
  }

  res.status(200).json({
    success: true,
    message: "Rejected!",
    data: updatedStatus,
  });
});

export {
  requested,
  newRequested,
  fetchPurchaseOrder,
  getSpecificId,
  deleteRequest,
  updateStatus,
  approvePurchaseRequisition,
  rejectPurchaseRequisition,
};
