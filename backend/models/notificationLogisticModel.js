import mongoose from "mongoose";

// Notification Schema
const notificationLogisticSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    requestRawmaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawmaterialRequest",
    },
    message: {
      type: String,
    },
    type: {
      type: String,
      enum: ["pending", "received", "delivered", "message"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the Notification model
const NotificationLogisticModel = mongoose.model(
  "NotificationLogistic",
  notificationLogisticSchema
);

export default NotificationLogisticModel;
