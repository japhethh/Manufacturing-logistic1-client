import mongoose from "mongoose";

const shipmentHistorySchema = new mongoose.Schema({
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment",
    required: true,
  },
  previousStatus: {
    type: String,
    enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
    required: true,
  },
  newStatus: {
    type: String,
    enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
    required: true,
  },
  changedBy: {
    type: String, // Could be user ID or username
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: String,
    required: false,
  },
});

const shipmentHistoryModel = mongoose.model(
  "ShipmentHistory",
  shipmentHistorySchema
);

export default shipmentHistoryModel;
