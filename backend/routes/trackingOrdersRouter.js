import express from "express";
import {
  getAllTrackingOrders,
  updateStatus,
  getSpecificId,
} from "../controllers/trackingOrdersController.js";
import { authMiddleware } from "../middleware/Auth.js";
const trackingOrdersRouter = express.Router();

trackingOrdersRouter.get("/", getAllTrackingOrders);
trackingOrdersRouter.put("/updateStatus/:id", authMiddleware, updateStatus);
trackingOrdersRouter.get("/getSpecificId/:id", authMiddleware, getSpecificId);

export default trackingOrdersRouter;
