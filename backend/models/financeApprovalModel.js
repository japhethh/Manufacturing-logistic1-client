import mongoose from "mongoose";

const financeApprovalSchema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    // required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "FinanceApproval" },
  // new
  reason: { type: String },
  comment: {
    type: String,
  },
  generatePdf: {
    type: String,
  },
  totalBudget: {
    type: Number,
  },
  totalRequest: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["Capital expenditures", "Operational Expenses"],
    required: true,
  },
  documents: {
    type: String,
    required: false,
  },
  department: { type: String, required: true },
  approvalId: { type: mongoose.Schema.Types.ObjectId, ref: "FinanceApproval" },
});

const financeApprovalModel = mongoose.model(
  "FinanceApproval",
  financeApprovalSchema
);

export default financeApprovalModel;
