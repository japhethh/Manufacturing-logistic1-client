// controllers/qcInspectionController.js
import QCInspectionModel from "../models/QCInspectionModel.js";
import DefectModel from "../models/DefectModel.js";
import expressAsyncHandler from "express-async-handler";
import Counter from "../models/Counter.js";

const qcCreate = expressAsyncHandler(async (req, res) => {
  try {
    const inspectionData = req.body;
    console.log(inspectionData);

    // Find and update the counter for generating unique inspectionCode
    const counter = await Counter.findByIdAndUpdate(
      { _id: "inspectionCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Generate a formatted inspection code, e.g., "INS-001"
    const inspectionNumber = counter.sequence_value.toString().padStart(3, "0");
    const inspectionCode = `INS-${inspectionNumber}`;

    // Create the QCInspectionModel instance manually
    const newQCInspection = new QCInspectionModel({
      inspectionCode,
      // productId: inspectionData.productId,
      invoiceId: inspectionData.invoiceId,
      inspectionDate: inspectionData.inspectionDate || new Date(),
      inspector: inspectionData.inspector,
      status: inspectionData.status,
      discrepancies: inspectionData.discrepancies || [],
    });

    // Save the new QC inspection document
    await newQCInspection.save();

    res.status(201).json({
      message: "QC inspection recorded successfully!",
      inspectionId: newQCInspection._id,
      inspectionCode: newQCInspection.inspectionCode, // Return the inspectionCode
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error recording QC inspection: " + error.message });
  }
});

export default qcCreate;

// Create Defect
const defectCreate = expressAsyncHandler(async (req, res) => {
  try {
    const defectData = req.body;
    const defect = await DefectModel.create(defectData);
    res
      .status(201)
      .json({ message: "Defect reported successfully!", defectId: defect._id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error reporting defect: " + error.message });
  }
});

export { qcCreate, defectCreate };
