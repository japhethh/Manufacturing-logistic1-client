import express from "express";

import {
  getUserData,
  getAllPendingOrders,
} from "../controllers/vendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/", authMiddleware, getUserData);

vendorRouter.get("/getAllPendingOrders", authMiddleware, getAllPendingOrders);

export default vendorRouter;
