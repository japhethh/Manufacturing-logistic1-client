import express from "express";
import { autoFillPurchaseOrder } from "../controllers/autoFill.js";


const purchaseOrderRouter = express.Router();

// purchaseOrderRouter.get("/", getAllPurchaseOrder);
purchaseOrderRouter.get("/auto-fill", autoFillPurchaseOrder);
// purchaseOrderRouter.get("/createPurchaseOrder",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/edit/:id",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/delete/:id",getAllPurchaseOrder);

export default purchaseOrderRouter;