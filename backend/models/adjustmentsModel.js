import mongoose from "mongoose";
import Counter from "./Counter.js";

const adjustmentSchema = mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    reference: { type: String },
    note: { type: String, trim: true },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  { timestamps: true }
);

// adjustmentSchema.pre("save", async function (next) {
//   try {
//     const counter = await Counter.findByIdAndUpdate(
//       {
//         _id: "adjustmentNumber",
//       },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     const adjustmentNumber = counter.sequence_value.toString().padStart(3, "0");

//     this.reference = `ADJ-${adjustmentNumber}`;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const adjustmentModel = mongoose.model("adjustments", adjustmentSchema);

export default adjustmentModel;
