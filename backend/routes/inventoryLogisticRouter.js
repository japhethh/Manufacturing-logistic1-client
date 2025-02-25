import express from "express";
import { getAllInventory } from "../controllers/invoiceLogisticController.js";
import { authMiddleware } from "../middleware/Auth.js";

const invoiceLogisticRouter = express.Router();

invoiceLogisticRouter.get("/", authMiddleware, getAllInventory);

export default invoiceLogisticRouter;
