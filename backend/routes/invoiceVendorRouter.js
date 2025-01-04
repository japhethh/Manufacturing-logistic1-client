import express from "express";
import {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  approveInvoice,
  rejectInvoice,
  paymentUpdate,
  getVendorAllInvoice,
  createVendorInvoice,
} from "../controllers/invoiceVendorController.js";
import { authMiddleware } from "../middleware/Auth.js";
import {
  invoiceVendorAll,
  invoiceVendorApproved,
  invoiceVendorPending,
} from "../aggregation/invoiceLogisticAggregation.js";

const invoiceVendorRouter = express.Router();

// Aggregation
invoiceVendorRouter.get("/invoicePending", invoiceVendorPending);

invoiceVendorRouter.get("/invoiceApproved", invoiceVendorApproved);

invoiceVendorRouter.get("/invoiceAll", invoiceVendorAll);

// Data
invoiceVendorRouter.get("/", authMiddleware, getAllInvoice);
invoiceVendorRouter.get("/vendorList", authMiddleware, getVendorAllInvoice);
invoiceVendorRouter.get("/:id", authMiddleware, getSingleInvoice);
invoiceVendorRouter.post("/create", authMiddleware, createInvoice);
invoiceVendorRouter.post("/manualCreate", authMiddleware, createVendorInvoice);
invoiceVendorRouter.put("/update/:id", authMiddleware, updateInvoice);
invoiceVendorRouter.delete("/delete/:id", authMiddleware, deleteInvoice);
invoiceVendorRouter.post("/approve/:id", authMiddleware, approveInvoice);
invoiceVendorRouter.post("/reject/:id", authMiddleware, rejectInvoice);
invoiceVendorRouter.put("/updateStatus/:id", authMiddleware, paymentUpdate);


export default invoiceVendorRouter;
