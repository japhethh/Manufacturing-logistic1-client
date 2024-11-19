import mongoose from "mongoose";
import Counter from "./Counter.js";

const invoiceVendorSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true, // Ensure invoice numbers are unique
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder", // Reference to the associated purchase order
      // required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", // Reference to the vendor/supplier
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material", // Reference to the product
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
          required: false, // Calculated as quantity * unitPrice
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, // Total amount for the invoice
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
        // required: true,
      },
      taxAmount: {
        type: Number,
        // required: true,
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
      default: "Unpaid", // Default status when created
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default status when created
    },
    description: {
      type: String,
      trim: true,
    },
    discount: { type: Number },
    shippingCharges: { type: Number },
    // logisticCustomer:{type:String, required:true}
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceVendorSchema);

export default Invoice;
