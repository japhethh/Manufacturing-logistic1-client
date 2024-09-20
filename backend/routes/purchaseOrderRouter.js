import express from "express";
import { autoFillPurchaseOrder } from "../controllers/autoFill.js";
import {createPurchaseOrder} from '../controllers/purchaseOrderController.js'
import authMiddleware from "../middleware/Auth.js";


const purchaseOrderRouter = express.Router();

// purchaseOrderRouter.get("/", getAllPurchaseOrder);
purchaseOrderRouter.get("/auto-fill", autoFillPurchaseOrder);
purchaseOrderRouter.post("/create",authMiddleware,createPurchaseOrder)
// purchaseOrderRouter.get("/createPurchaseOrder",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/edit/:id",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/delete/:id",getAllPurchaseOrder);

export default purchaseOrderRouter;