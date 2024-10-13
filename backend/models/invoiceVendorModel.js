import mongoose from "mongoose";

const invoiceVendorSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
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
        enum: ['Credit Card',"Pay on Delivery", 'Bank Transfer', 'Cash', 'Other'],
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
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      trackingNumber: {
        type: String,
        required: false,
      },
    },
    tax: {
      taxRate: {
        type: Number,
        required: true,
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
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending", // Default status when created
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceVendorSchema);

export default Invoice;
