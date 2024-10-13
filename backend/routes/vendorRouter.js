import express from "express";

import {
  getUserData,
  getAllPendingOrders,
  getAllReceivingOrders,
  approveOrders,
  rejectOrders,
  getAllCompleteOrders,
} from "../controllers/vendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/", authMiddleware, getUserData);

vendorRouter.get("/getAllPendingOrders", authMiddleware, getAllPendingOrders);
vendorRouter.get(
  "/getAllReceivingOrders",
  authMiddleware,
  getAllReceivingOrders
);

vendorRouter.get("/getAllCompleteOrders", authMiddleware, getAllCompleteOrders);
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
// vendorRouter.post("/purchaseOrders/reject", rejectOrders);

export default vendorRouter;
