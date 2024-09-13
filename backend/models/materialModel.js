import mongoose from "mongoose";

const materialSchema = mongoose.Shema({
  materialName: {
    type: String,
    required: true,
  },
  materialCode: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
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
});

const MaterialModel = mongoose.model("Material", materialSchema);

export default MaterialModel;
