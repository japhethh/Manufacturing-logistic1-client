import express from "express";


const purchaseOrderRouter = express.Router();

purchaseOrderRouter.get("/", getAllPurchaseOrder);
// purchaseOrderRouter.get("/createPurchaseOrder",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/edit/:id",getAllPurchaseOrder);
// purchaseOrderRouter.get("/purchaseOrder/delete/:id",getAllPurchaseOrder);
