import mongoose from "mongoose";

const ReturnRequestSchema = new mongoose.Schema(
  {
    returnRequestNumber: { type: String, required: true, unique: true }, 
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    severity: {
      type: String,
      enum: ["Minor", "Major", "Critical"],
      required: true,
    },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    defects: { type: mongoose.Schema.Types.ObjectId, ref: "Defect" },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Returned"],
      default: "Pending",
    },
    reportedBy: mongoose.Schema.Types.Mixed,
    returnShipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReturnShipment",
    }, // Links to shipment details
    attachments: [{ type: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

const ReturnRequestModel = mongoose.model("ReturnRequest", ReturnRequestSchema);
export default ReturnRequestModel;
