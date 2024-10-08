import mongoose from "mongoose";

const financeApprovalSchema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Approved", "Rejected"],
    default: "Pending",
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
  // NEW Dagdag ni kupal na raffy
  // budget: {
  //   type: String,
  // },
  // account: {
  //   type: String,
  //   required: true,
  // },
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
});

const financeApprovalModel = mongoose.model(
  "FinanceApproval",
  financeApprovalSchema
);

export default financeApprovalModel;
