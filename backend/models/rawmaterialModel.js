import mongoose from "mongoose";

const rawmaterialSchema = mongoose.Schema({
  requestDate: {
    type: Date,
    default: Date.now,
  },
  requestStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedBy: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approvalDate: {
    type: Date,
  },
  material: [
    {
      materialName: String,
      materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
      quantity: Number,
      unit: String,
    },
  ],
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  notes: {
    type: String,
    trim: true,
  },
});

const rawmaterialModel = mongoose.model(
  "RawmaterialRequest",
  rawmaterialSchema
);

export default rawmaterialModel;
