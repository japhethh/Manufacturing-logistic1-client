import express from "express";
import {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  approveInvoice,
  rejectInvoice,
} from "../controllers/invoiceVendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const invoiceVendorRouter = express.Router();

invoiceVendorRouter.get("/", authMiddleware, getAllInvoice);
invoiceVendorRouter.get("/:id", authMiddleware, getSingleInvoice);
invoiceVendorRouter.post("/create", authMiddleware, createInvoice);
invoiceVendorRouter.put("/update/:id", authMiddleware, updateInvoice);
invoiceVendorRouter.delete("/delete/:id", authMiddleware, deleteInvoice);
invoiceVendorRouter.post("/approve/:id", authMiddleware, approveInvoice);
invoiceVendorRouter.post("/reject/:id", authMiddleware, rejectInvoice);

export default invoiceVendorRouter;
