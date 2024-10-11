import express from "express";

import {
  getUserData,
  getAllPendingOrders,
  approveOrders,
  rejectOrders,
} from "../controllers/vendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/", authMiddleware, getUserData);

vendorRouter.get("/getAllPendingOrders", authMiddleware, getAllPendingOrders);
vendorRouter.put(
  "/purchaseOrders/approved/:orderId",
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
