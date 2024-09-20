import mongoose from "mongoose";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
import rawmaterialModel from "../models/rawmaterialModel.js";

// Create Purchase Order Controller
const createPurchaseOrder = asyncHandler(async (req, res) => {
  const {
    items,               // Array of items
    totalAmount,          // Total amount of the purchase order
    requestedBy,          // ID of the raw material request
    deliveryDate,         // Date for delivery (if needed)
    paymentTerms,         // Payment terms (optional field)
    orderNotes,           // Additional notes for the order
    orderDate,            // Date the order was created
    requestStatus,        // Status of the raw material request
    userId,               // ID of the user who is creating the order
  } = req.body;

  try {
    // Validate that requestedBy (raw material request) is provided
    if (!requestedBy) {
      return res.status(400).json({ message: "Requested By is required." });
    }

    // Validate raw material request existence
    const existingRequest = await rawmaterialModel.findById(requestedBy);
    if (!existingRequest) {
      return res.status(404).json({ message: "Raw material request not found." });
    }

    // Generate a unique purchase order number
    const purchaseOrderNumber = `PO-${Date.now()}`;

    // Create the purchase order
    const newPurchaseOrder = new purchaseOrderModel({
      purchaseOrderNumber,
      rawmaterialRequest: requestedBy, // Linking to the raw material request
      items,                           // Array of items
      totalAmount,                     // Total amount for the order
      orderStatus: "Pending",          // Default order status
      approvalStatus: "Pending",       // Default approval status
      createdBy: userId,               // The user creating the order
    });

    // Save the new purchase order
    const savedPurchaseOrder = await newPurchaseOrder.save();

    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all purchase orders
const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const purchaseOrders = await purchaseOrderModel
      .find()
      .populate("createdBy", "name email") // Populate the createdBy field with user info
      .populate("rawmaterialRequest", "name description"); // Populate the raw material request

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error("Error retrieving purchase orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { createPurchaseOrder, getAllPurchaseOrder };
