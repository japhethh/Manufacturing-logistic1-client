import mongoose from "mongoose";

const purchaseOrderSchema = mongoose.Schema(
  {
    purchaseOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    rawmaterialRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawmaterialRequest",
      required: true,
    },
    items: [
      {
        material: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
          required: true,
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
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
