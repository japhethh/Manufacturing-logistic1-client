import mongoose from "mongoose";
import Counter from "./Counter.js";

const categorySchema = mongoose.Schema(
  {
    category_code: { type: String, trim: true },
    category_name: { type: String, required: true, trim: true },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate category_code if not set
categorySchema.pre("save", async function (next) {
  // Generate category_code if not set
  if (!this.category_code) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "category_code" }, // Identifier for the category_code counter
        { $inc: { sequence_value: 1 } }, // Increment the sequence value by 1
        { new: true, upsert: true } // Return the updated document and create if it doesn't exist
      );

      const sequenceNumber = counter.sequence_value.toString().padStart(3, "0"); // e.g., 001
      this.category_code = `CA-${sequenceNumber}`; // Assign the generated code
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
