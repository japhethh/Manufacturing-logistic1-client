import mongoose from "mongoose";

const shipmentShema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },

  shipmentStatus: {
    type: String,
    enum: ["Shipped", "In Transit", "Delivered"],
    default: "Shipped",
  },
  trackingNumber: String,
  carrier: String,
  shippedData: Date,
  deliveryDate: Date,
});

const shipmentModel = mongoose.model("Shipment", shipmentShema);

export default shipmentModel;
