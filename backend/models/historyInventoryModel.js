import mongoose from "mongoose";

const historyInventorySchema = new mongoose.Schema(
  {
    itemName: { type: String },
    quantity: { type: String },
    unit: { type: String },
  },
  { timestamps: true }
);

const historyInventoryModel = mongoose.model(
  "historyInventory",
  historyInventorySchema
);

export default historyInventoryModel;
