import mongoose from "mongoose";

// Notification Schema
const notificationVendorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    message: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "pending", // General pending notification
        "received", // Received notification
        "delivered", // Delivered notification
        "approved_invoice", // Invoice has been approved
        "rejected_invoice", // Invoice has been rejected
        "new_purchase_order", // New purchase order created
        "order_shipped", // Order has been shipped
        "inventory_low", // Inventory is low, needs restocking
        "production_started", // Production has started
        "production_completed", // Production completed
        "quality_check_passed", // Quality check passed
        "quality_check_failed", // Quality check failed
        "awaiting_payment", // Payment is pending
        "message", // General message
      ],
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
const NotificationVendorModel = mongoose.model(
  "Notification",
  notificationVendorSchema
);

export default NotificationVendorModel;
