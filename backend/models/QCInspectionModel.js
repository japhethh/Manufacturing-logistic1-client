import mongoose from "mongoose";

const QCInspectionSchema = mongoose.Schema({
  inspectionCode: { type: String, required: true, unique: true },
  inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: "QCInspection" },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Invoice",
  },
  inspectionDate: { type: Date, default: Date.now },
  inspector: { type: String, required: true },
  status: { type: String, enum: ["Pass", "Fail"], required: true },
  discrepancies: [{ type: String }],
});

const QCInspectionModel = mongoose.model("QCInspection", QCInspectionSchema);

export default QCInspectionModel;
