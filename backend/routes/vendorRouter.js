import express from "express";

import {
  getUserData,
  getAllPendingOrders,
  getAllReceivingOrders,
  approveOrders,
  rejectOrders,
  getAllCompleteOrders,
  getAllRejectedOrders,
} from "../controllers/vendorController.js";
import { authMiddleware } from "../middleware/Auth.js";
import { vendorCount } from "../aggregation/productsAggregation.js";

const vendorRouter = express.Router();

vendorRouter.get("/", authMiddleware, getUserData);

vendorRouter.get("/getAllPendingOrders", authMiddleware, getAllPendingOrders);
vendorRouter.get(
  "/getAllReceivingOrders",
  authMiddleware,
  getAllReceivingOrders
);

vendorRouter.get("/getAllCompleteOrders", authMiddleware, getAllCompleteOrders);
vendorRouter.get("/getAllRejectedOrders", authMiddleware, getAllRejectedOrders);

vendorRouter.put(
  "/purchaseOrders/approve/:orderId",
  authMiddleware,
  approveOrders
);
vendorRouter.put(
  "/purchaseOrders/rejected/:orderId",
  authMiddleware,
  rejectOrders
);

vendorRouter.get("/vendorCount", vendorCount);

export default vendorRouter;
