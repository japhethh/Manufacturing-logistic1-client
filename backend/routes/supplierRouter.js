import express from "express";
import {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  deleteSupplier,
  completeRegistration,
  approveSupplier,
  rejectSupplier,
  loginSupplier,
  getSearch,
} from "../controllers/supplierController.js";

const supplierRouter = express.Router();

supplierRouter.get("/suppliers", getAllSupplier);
supplierRouter.post("/addsuppliers", createSupplier);
supplierRouter.get("/suppliers/:id", getSupplierById);
supplierRouter.delete("/delete/:id", deleteSupplier);
supplierRouter.put("/completeRegistration", completeRegistration);
supplierRouter.put("/approveSupplier/:id", approveSupplier);
supplierRouter.delete("/rejectSupplier/:id", rejectSupplier);

// New 
supplierRouter.post("/login", loginSupplier);
supplierRouter.post("/supplierSearch", getSearch);
export default supplierRouter;
