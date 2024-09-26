import mongoose from "mongoose";

const shipmentShema = mongoose.Schema(
  {
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    shipmentStatus: {
      type: String,
      enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
      default: "Shipped",
    },
    trackingNumber: {
      type: String,
      required: false,
    },
    carrier: {
      type: String,
      required: false,
    },
    shippedDate: {
      type: Date,
      required: false,
    },
    deliveryDate: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const shipmentModel = mongoose.model("Shipment", shipmentShema);

export default shipmentModel;
