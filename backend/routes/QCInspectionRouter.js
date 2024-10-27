import express from "express";
import {
  defectCreate,
  qcCreate,
} from "../controllers/QCInspectionController.js";
const QCInspectionRouter = express.Router();

QCInspectionRouter.post("/qc-inspections", qcCreate);
QCInspectionRouter.post("/defects", defectCreate);

export default QCInspectionRouter;
