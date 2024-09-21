import mongoose from "mongoose";

// Purchase Order Schema
const purchaseOrderSchema = mongoose.Schema(
  {
    purchaseOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    tax: { type: Number },
    totalAmount: {
      type: Number,
      required: true,
    },
    notes: { type: String },
    orderDate: { type: Date, default: Date.now },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
    paymentTerm: { type: String, required: true },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const purchaseOrderModel = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default purchaseOrderModel;
