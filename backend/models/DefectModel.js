import mongoose from "mongoose";

const DefectSchema = mongoose.Schema({
  defectId: { type: String, required: true, unique: true },
  inspectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QCInspection",
    required: true,
  },
  description: { type: String, required: true }, // Description of the defect
  severity: {
    type: String,
    enum: ["Minor", "Major", "Critical"],
    required: true,
  },
  actionTaken: { type: String }, // Steps taken to rectify the defect
  resolved: { type: Boolean, default: false }, // Indicates if the defect has been resolved
});

const DefectModel = mongoose.model("Defect", DefectSchema);

export default DefectModel;
