import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category_code: { type: String, required: true, trim: true },
    category_name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
