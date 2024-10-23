import mongoose from "mongoose";
import Counter from "./Counter.js";

const materialSchema = mongoose.Schema({
  materialName: {
    type: String,
    required: true,
  },
  materialCode: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    enum:["pcs"],
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  available: {
    type: Number,
    required: true,
    default: 10,
  },
  cost: { type: Number },
  // New properties
  note: { type: String, required: false, trim: true },
  tax: { type: Number },
  alertQuantity: { type: Number },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  // image: {
  //   type: String,
  //   required: false,
  // },
});

materialSchema.pre("save", async function (next) {
  if (!this.materialCode) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "materialCode" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      const sequenceNumber = counter.sequence_value.toString().padStart(3, "0");

      this.materialCode = `MC-${sequenceNumber}`;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const MaterialModel = mongoose.model("Material", materialSchema);

export default MaterialModel;
