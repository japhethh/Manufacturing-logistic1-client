// ReturnModel.js
const mongoose = require("mongoose");
import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  returnReason: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  returnDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Processed", "Completed"],
    default: "Pending",
  },
  defectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Defect", // Reference to the Defect model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ReturnModel = mongoose.model("Return", ReturnSchema);
export default ReturnModel;
