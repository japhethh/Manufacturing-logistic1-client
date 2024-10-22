import mongoose from "mongoose";

const adjusted_productsSchema = mongoose.Schema({
  adjustment_id: { type: mongoose.Schema.Types.ObjectId, ref: "adjustments" },
  material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ["add", "sub"], required: true },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
});

const adjusted_productsModel = mongoose.model(
  "adjusted_products",
  adjusted_productsSchema
);

export default adjusted_productsModel;
