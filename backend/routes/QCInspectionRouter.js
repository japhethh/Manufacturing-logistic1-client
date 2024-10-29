import express from "express";
import multer from "multer";
import {
  defectCreate,
  qcCreate,
} from "../controllers/QCInspectionController.js";
const QCInspectionRouter = express.Router();

// Multer configuration for file uploads (if needed)
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Local temporary storage for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

QCInspectionRouter.post("/qc-inspections", qcCreate);
QCInspectionRouter.post("/defects", upload.array("images", 10), defectCreate);
export default QCInspectionRouter;
