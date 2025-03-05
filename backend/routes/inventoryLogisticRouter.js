import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllInventory,
  addOrUpdateInventory,
  getInventoryById,
  deleteInventory,
  sendRequest,
} from "../controllers/inventoryLogisticController.js";

const invoiceLogisticRouter = express.Router();

invoiceLogisticRouter.get("/", authMiddleware, getAllInventory);
invoiceLogisticRouter.post("/", addOrUpdateInventory);
invoiceLogisticRouter.get("/:id", authMiddleware, getInventoryById);
invoiceLogisticRouter.delete("/:id", authMiddleware, deleteInventory);
invoiceLogisticRouter.post("/update", authMiddleware, sendRequest);
export default invoiceLogisticRouter;
