import express from "express";
import { createInvoice } from "../controllers/invoiceVendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const invoiceVendorRouter = express.Router();

// invoiceVendorRouter.get("/", authMiddleware, getAllInvoice);
// invoiceVendorRouter.get("/:id", authMiddleware, getAllInvoice);
invoiceVendorRouter.post("/create", authMiddleware, createInvoice);
// invoiceVendorRouter.put("/update/:id", authMiddleware, updateInvoice);
// invoiceVendorRouter.delete("/delete/:id", authMiddleware, deleteInvoice);

export default invoiceVendorRouter;
