import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    warehouseLocation: { type: String, required: true },
    totalStock: { type: Number, default: 0 },
    reservedStock: { type: Number, default: 0 },
    availableStock: { type: Number, default: 0 },
    unit: { type: String, required: true },
    batchNumbers: [{ type: String }],
    expiryDates: [{ type: Date }],
    lastSupplierId: { type: String },
    lastSupplierName: { type: String },
    lastReceivedDate: { type: Date },
    lastUpdatedBy: { type: String },
  },
  { timestamps: true }
);

const inventoryModel = mongoose.model("InventoryLogistic", InventorySchema);

export default inventoryModel;
