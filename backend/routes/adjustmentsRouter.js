import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllAdjustment,
  getSpecificAdjustmentId,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment,
} from "../controllers/adjustmentsController.js";
const adjustmentsRouter = express.Router();

adjustmentsRouter.get("/", authMiddleware, getAllAdjustment);
adjustmentsRouter.get("/getSpecificId/:id", authMiddleware, getSpecificAdjustmentId);
adjustmentsRouter.post("/create", authMiddleware, createAdjustment);
adjustmentsRouter.put("/update/:id", authMiddleware, updateAdjustment);
adjustmentsRouter.delete("/delete/:id", authMiddleware, deleteAdjustment);

export default adjustmentsRouter;
