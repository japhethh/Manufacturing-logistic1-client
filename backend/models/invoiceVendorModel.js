import mongoose from "mongoose";
import Counter from "./Counter.js";

const invoiceVendorSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: false,
        },
        totalPrice: {
          type: Number,
          required: false,
        },
        name: { type: String, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
        price: { type: Number, required: true },
        discount: { type: Number },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
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
        required: true,
      },
      paymentDate: {
        type: Date,
        required: false,
      },
      transactionId: {
        type: String,
        required: false,
      },
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    shippingDetails: {
      shippingAddress: {
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
        address: { type: String },
      },
      trackingNumber: {
        type: String,
        required: false,
      },
    },
    tax: {
      taxRate: {
        type: Number,
      },
      taxAmount: {
        type: Number,
      },
    },
    notes: {
      type: String,
      trim: true,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Unpaid", "Cancelled"],
      default: "Unpaid",
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    description: {
      type: String,
      trim: true,
    },
    discount: { type: Number },
    shippingCharges: { type: Number },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceVendorSchema);

export default Invoice;
