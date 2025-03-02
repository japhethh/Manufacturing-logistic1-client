import express from "express";
import {
  getAllReturnRequest,
  updateReturnRequest,
} from "../controllers/returnRequestController.js";
import { authMiddleware } from "../middleware/Auth.js";
const returnManagementRouter = express.Router();

returnManagementRouter.get("/", getAllReturnRequest);
returnManagementRouter.put("/:id", authMiddleware, updateReturnRequest);
export default returnManagementRouter;
