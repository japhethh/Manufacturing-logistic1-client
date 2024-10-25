import mongoose from "mongoose";

const TrackingOrderSchema = mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice", // Reference to the Invoice model
      required: true,
    },
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder", // Reference to the PurchaseOrder model
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered"],
      default: "Pending",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", // Reference to the Supplier model
      required: true,
    },
    invoiceAmount: {
      // Capture invoice amount
      type: Number,
      required: true,
    },
    purchaseOrderAmount: {
      // Capture purchase order amount
      type: Number,
      required: true,
    },
    quantityOrdered: {
      // Add quantity ordered for clarity
      type: Number,
      // required: true,
    },
    quantityInvoiced: {
      // Add quantity invoiced to track discrepancies
      type: Number,
      // required: true,
    },
    totalAmount: {
      // Total amount based on the invoice
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const TrackingOrderModel = mongoose.model("TrackingOrder", TrackingOrderSchema);

export default TrackingOrderModel;
