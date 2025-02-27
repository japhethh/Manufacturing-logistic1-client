import express from "express";
import { getAllReturnRequest } from "../controllers/returnVendorManagementController.js";
import { authMiddleware } from "../middleware/Auth.js";
const returnVendorManagementRouter = express.Router();

returnVendorManagementRouter.get("/", authMiddleware, getAllReturnRequest);

export default returnVendorManagementRouter;
