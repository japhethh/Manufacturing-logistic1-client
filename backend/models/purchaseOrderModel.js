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
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
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
      enum: [
        "Pending",
        "In Process",
        "Approved",
        "Rejected",
        "Shipped",
        "Delivered",
        "Completed",
      ],
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
    pdfURL: {
      // New Field for PDF Storage
      type: String,
      required: false,
    },
    assignedApprover: {
      // New Field for Finance Approval
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvalDate: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
    financeApproval: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FinanceApproval",
    },
    category: {
      type: String,
      enum: ["Capital expenditures", "Operational Expenses"],
    },

    // HISTORY
    statusHistory: [
      {
        statusType: {
          type: String,
          enum: ["orderStatus", "approvalStatus"],
          required: true,
        },
        previousStatus: {
          type: String,
          enum: [
            "Pending",
            "In Process",
            "Approved",
            "Rejected",
            "Shipped",
            "Delivered",
            "Approval Pending",
          ],
        },
        newStatus: {
          type: String,
          enum: [
            "Pending",
            "In Process",
            "Approved",
            "Rejected",
            "Shipped",
            "Delivered",
            "Approval Pending",
          ],
          required: true,
        },
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Supplier",
          // required: true,
        },
        changedAt: { type: Date, default: Date.now },
        notes: { type: String }, // Optional notes on the status change
      },
    ],
    paymentDetails: {
      paymentMethod: {
        type: String,
        enum: [
          "Credit Card",
          "Cash on Delivery",
          "GCash",
          "Bank Transfer",
          "Other",
        ],
      },
      // paymentDate: {
      //   type: Date,
      //   required: false,
      // },
      // transactionId: {
      //   type: String,
      //   required: false,
      // },
    },
    companyAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralSettings",
    },
  },
  { timestamps: true }
);

const purchaseOrderModel = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default purchaseOrderModel;
