// TrackingOrderSchema.js
import mongoose from "mongoose";

const TrackingOrderSchema = mongoose.Schema(
  {
    trackingOrderNumber: {
      type: String,
      required: true,
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "Dispatch", "In Transit", "Delivered"],
      default: "Pending",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    invoiceAmount: {
      type: Number,
      required: true,
    },
    purchaseOrderAmount: {
      type: Number,
      required: true,
    },
    quantityOrdered: {
      type: Number,
    },
    quantityInvoiced: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingDate: {
      type: Date,
    },
    receivedDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    alreadyDispatch: { type: Boolean },
    generalSettings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralSettings",
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        date: { type: Date, default: Date.now },
        details: { type: String },
        description: { type: String },
        location: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const TrackingOrderModel = mongoose.model("TrackingOrder", TrackingOrderSchema);
export default TrackingOrderModel;
