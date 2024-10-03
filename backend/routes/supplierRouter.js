import express from "express";
import {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  deleteSupplier,
  completeRegistration,
} from "../controllers/supplierController.js";

const supplierRouter = express.Router();

supplierRouter.get("/suppliers", getAllSupplier);
supplierRouter.post("/addsuppliers", createSupplier);
supplierRouter.get("/suppliers/:id", getSupplierById);
supplierRouter.delete("/delete/:id", deleteSupplier);
supplierRouter.put("/completeRegistration",completeRegistration)

export default supplierRouter;
