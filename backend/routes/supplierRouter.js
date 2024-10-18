import express from "express";
import {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  deleteSupplier,
  completeRegistration,
  approveSupplier,
  deactivatedSupplier,
  loginSupplier,
  getSearch,
  updateSupplier,
} from "../controllers/supplierController.js";
import { authMiddleware } from "../middleware/Auth.js";

const supplierRouter = express.Router();

supplierRouter.get("/suppliers", getAllSupplier);
supplierRouter.post("/addsuppliers", createSupplier);
supplierRouter.get("/suppliers/:id", getSupplierById);
supplierRouter.delete("/delete/:id", deleteSupplier);
supplierRouter.put("/completeRegistration", completeRegistration);
supplierRouter.put("/updateSupplier/:id", updateSupplier);
supplierRouter.put("/approveSupplier/:id", approveSupplier);
supplierRouter.put("/deactivatedSupplier/:id", deactivatedSupplier);

// New
supplierRouter.post("/login", loginSupplier);
supplierRouter.post("/supplierSearch", getSearch);
export default supplierRouter;
