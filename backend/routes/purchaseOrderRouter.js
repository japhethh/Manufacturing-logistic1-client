import express from "express";
import { autoFillPurchaseOrder } from "../controllers/autoFill.js";
import {
  createPurchaseOrder,
  getAllPurchaseOrder,
  fetchSpecificPo,
  getSpecificPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  updateStatus,
  updateStatusFinance,
} from "../controllers/purchaseOrderController.js";
import { authMiddleware } from "../middleware/Auth.js";

const purchaseOrderRouter = express.Router();

// Get all purchase orders
purchaseOrderRouter.get("/", getAllPurchaseOrder);
purchaseOrderRouter.get("/:id", fetchSpecificPo);
purchaseOrderRouter.get("/edit/:id", getSpecificPurchaseOrder);
purchaseOrderRouter.put("/update/:id", authMiddleware, updatePurchaseOrder);
purchaseOrderRouter.get("/auto-fill", autoFillPurchaseOrder);
purchaseOrderRouter.post("/create", authMiddleware, createPurchaseOrder);
purchaseOrderRouter.post("/delete/:id", authMiddleware, deletePurchaseOrder);
purchaseOrderRouter.put("/updateStatus/:id", updateStatus);
purchaseOrderRouter.post("/updateStatusFinance", updateStatusFinance);

export default purchaseOrderRouter;
