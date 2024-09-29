import mongoose from "mongoose";

const financeApprovalSchema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },

  // financeReviewer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Approved", "Rejected"],
    default: "Pending",
  },
  comments: {
    type: String,
  },
  generatePdf: {
    type: String,
  },
});

const financeApprovalModel = mongoose.model(
  "FinanceApproval",
  financeApprovalSchema
);

export default financeApprovalModel;
