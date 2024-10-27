import mongoose from "mongoose";

const QCInspectionSchema = mongoose.Schema({
  inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: "QCInspection" }, // Reference to itself
  inspectionCode: { type: String, required: true, unique: true }, // Custom unique code

  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      // required: true,
    }
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
