import mongoose from "mongoose";

const ReturnRequestSchema = new mongoose.Schema(
  {
    returnRequestNumber: { type: String, required: true, unique: true }, // Unique return number
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    defects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Defect" }], // Links to Defect Model
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Returned"],
      default: "Pending",
    },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Approval required before shipping
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
