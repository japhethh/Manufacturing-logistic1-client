import mongoose from "mongoose";

const auditSupplierModel = mongoose.Schema(
  {
    eventTypes: {
      type: String,
      enum: ["Create", "Update", "Delete", "Approved", "Rejected", "Dispatch"],
      required: true,
    },
    entityType: {
      type: String,
      enum: [
        "PurchaseOrder",  
        "Invoice",
        "categories",
        "RawmaterialRequest",         
        "Tracking Order",
        "Material",
        "Supplier",
      ],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entityType",
      required: true,
    },
    changes: {
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed,
    },
    performeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    role: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const AuditSupplierLog = mongoose.model("AuditSupplierLog", auditSupplierModel);

export default AuditSupplierLog;
