import mongoose from "mongoose";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
import rawmaterialModel from "../models/rawmaterialModel.js";

// Create Purchase Order Controller
const createPurchaseOrder = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      purchaseOrderNumber,
      supplier,
      orderDate,
      items,
      tax,
      totalAmount,
      notes,
      paymentTerm,
      approvalStatus,
      userId, // Assuming you're getting user info from the token
    } = req.body;

    // Check if any required fields are missing
    if (
      !purchaseOrderNumber ||
      !supplier ||
      !orderDate ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const purchaseOrder = new purchaseOrderModel({
      purchaseOrderNumber,
      supplier,
      orderDate,
      items,
      tax,
      totalAmount, // Calculate totalAmount on the server if not included
      notes,
      paymentTerm,
      approvalStatus,
      createdBy: userId,
    });

    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all purchase orders
const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const purchaseOrders = await purchaseOrderModel
      .find()
      .populate("createdBy", "name email")
      .populate("supplier"); // Populate the createdBy field with user info
    // .populate("rawmaterialRequest", "name description"); // Populate the raw material request

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error("Error retrieving purchase orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { createPurchaseOrder, getAllPurchaseOrder };
