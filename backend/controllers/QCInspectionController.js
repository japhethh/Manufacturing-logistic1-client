// controllers/qcInspectionController.js
import QCInspectionModel from "../models/QCInspectionModel.js";
import DefectModel from "../models/DefectModel.js";
import expressAsyncHandler from "express-async-handler";
import Counter from "../models/Counter.js";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const qcCreate = expressAsyncHandler(async (req, res) => {
  try {
    const { productId, inspector, status, discrepancies, invoiceId } = req.body;

    // console.log(req.body);

    const counter = await Counter.findByIdAndUpdate(
      { _id: "inspectionCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const inspectionNumber = counter.sequence_value.toString().padStart(3, "0");
    const inspectionCode = `INS-${inspectionNumber}`;

    const newQCInspection = new QCInspectionModel({
      inspectionCode,
      invoiceId,
      inspector,
      status,
      discrepancies: discrepancies || [],
    });

    const saveNewQualityControl = await newQCInspection.save();

    newQCInspection.inspectionId = saveNewQualityControl._id;

    await newQCInspection.save();

    // console.log(newQCInspection);

    res.status(201).json({
      message: "QC inspection recorded successfully!",
      inspectionId: newQCInspection.inspectionId,
      invoiceId: invoiceId,
      inspectionCode: newQCInspection.inspectionCode,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error recording QC inspection: " + error.message });
  }
});

// Create Defect
const defectCreate = expressAsyncHandler(async (req, res) => {
  try {
    const { defectDescription, invoiceId, inspector, inspectionId, severity } =
      req.body;

    // Generate defect code
    const counter = await Counter.findByIdAndUpdate(
      { _id: "defectCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const defectNumber = counter.sequence_value.toString().padStart(3, "0");
    const defectCode = `DEF-${defectNumber}`;

    const uploadedImages = [];

    // Upload images to Cloudinary, each file individually
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "defect_images", // Specify the Cloudinary folder
      });
      uploadedImages.push(result.secure_url); // Add Cloudinary URL to the array

      // Optionally delete the local file after upload
      fs.unlinkSync(file.path);
    }

    // Create the defect with the uploaded image URLs
    const defect = new DefectModel({
      defectDescription,
      inspector,
      invoiceId,
      inspectionId,
      severity,
      defectCode,
      images: uploadedImages,
    });

    const savedDefect = await defect.save();

    res.status(201).json({
      message: "Defect reported successfully!",
      defectId: savedDefect._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error reporting defect: " + error.message });
  }
});
export { qcCreate, defectCreate };
