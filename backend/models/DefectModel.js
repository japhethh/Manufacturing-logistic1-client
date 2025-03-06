import mongoose from "mongoose";

const DefectSchema = new mongoose.Schema(
  {
    defectId: { type: mongoose.Schema.Types.ObjectId, ref: "Defect" },
    defectCode: { type: String, required: true },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    inspectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QCInspection",
      required: false,
    },
    defectDescription: { type: String, required: true },
    severity: {
      type: String,
      enum: ["Minor", "Major", "Critical"],
      required: true,
    },
    actionTaken: { type: String },
    department: { type: String },
    inspector: { type: String },
    resolved: { type: Boolean, default: false },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Closed"],
      default: "Pending",
    },
    returnRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReturnRequest",
      default: null,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
  }
);

const DefectModel = mongoose.model("Defect", DefectSchema);

export default DefectModel;
