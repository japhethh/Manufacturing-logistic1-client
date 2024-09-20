import mongoose from "mongoose";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
import rawmaterialModel from "../models/rawmaterialModel.js";

// const createPurchaseOrder = asyncHandler(async (req, res) => {
//   const { rawMaterialRequestId } = req.body;

//   const existingRequest = await rawmaterialModel.findById(request._id);7

//   if (!existingRequest) {
//     return res.status(404).json({ message: "Raw material request not found" });
//   }
// });

const createPurchaseOrder = asyncHandler(async (req, res) => {
  const {
    items,
    totalAmount,
    requestedBy,
    deliveryDate,
    paymentTerms,
    orderNotes,
    requestStatus,
    userId,
  } = req.body;

  try {
    if (!requestedBy) {
      return res.status(400).json({ message: "Requested By is required." });
    }

    // Create the purchase order
    const newPurchaseOrder = new purchaseOrderModel({
      items,
      totalAmount,
      requestedBy, // This could be an ID or name based on your requirements
      deliveryDate,
      paymentTerms,
      orderNotes,
      requestStatus,
      createdBy: userId, // Assuming you have user information in req.user from authentication middleware
    });

    const savedPurchaseOrder = await newPurchaseOrder.save();
    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  const purchaseOrder = await purchaseOrderModel.find();
});

export { createPurchaseOrder, getAllPurchaseOrder };
