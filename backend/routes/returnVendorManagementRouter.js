import express from "express";
import {
  getAllReturnRequest,
  updateReturnRequest,
} from "../controllers/returnVendorManagementController.js";
import { authMiddleware } from "../middleware/Auth.js";
const returnVendorManagementRouter = express.Router();

returnVendorManagementRouter.get("/", authMiddleware, getAllReturnRequest);
returnVendorManagementRouter.put("/:id", authMiddleware, updateReturnRequest);

export default returnVendorManagementRouter;
