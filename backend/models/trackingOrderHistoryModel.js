import mongoose from "mongoose";

const trackingOrderHistorySchema = mongoose.Schema(
  {
    trackingOrderNumber: {
      type: String,
      // required: true,
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "Dispatch", "In Transit", "Delivered"],
      default: "Pending",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    invoiceAmount: {
      type: Number,
    },
    purchaseOrderAmount: {
      type: Number,
    },
    quantityOrdered: {
      type: Number,
    },
    quantityInvoiced: {
      type: Number,
    },
    totalAmount: {
      type: Number,
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
    trackingOrderHistoryStatus: {
      type: String,
      enum: ["Deleted", "Updated", "Created"],
    },
  },
  { timestamps: true }
);

const trackingOrderHistoryModel = mongoose.model(
  "trackingOrderHistory",
  trackingOrderHistorySchema
);

export default trackingOrderHistoryModel;
