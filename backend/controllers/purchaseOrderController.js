import mongoose from "mongoose";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
import rawmaterialModel from "../models/rawmaterialModel.js";

const createPurchaseOrder = asyncHandler(async (req, res) => {
  const { request } = req.body;

  const existingRequest = await rawmaterialModel.findById(request._id);

  if (!existingRequest) {
    return res.status(404).json({ message: "Raw material request not found" });
  }
});

const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  const purchaseOrder = await purchaseOrderModel.find();
});
