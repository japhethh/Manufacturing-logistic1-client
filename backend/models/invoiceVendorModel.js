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
      required: true,
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
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true, // Calculated as quantity * unitPrice
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
        required: true,
      },
    },
    notes: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid","Unpaid", "Cancelled"],
      default: "Unpaid", // Default status when created
    },
  },
  { timestamps: true }
);

invoiceVendorSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findByIdAndUpdate(
      {
        _id: "invoiceNumber",
      },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const invoiceNumber = counter.sequence_value.toString().padStart(3, "0");
    this.invoiceNumber = `IC-${invoiceNumber}`;
  } catch (error) {
    return next(error);
  }
});

const Invoice = mongoose.model("Invoice", invoiceVendorSchema);

export default Invoice;
