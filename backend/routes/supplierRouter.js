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
  getSupplierData,
  changePassword,
  getSupplierWinner,
} from "../controllers/supplierController.js";
import { authMiddleware } from "../middleware/Auth.js";

const supplierRouter = express.Router();

supplierRouter.get("/suppliers", getAllSupplier);
supplierRouter.get("/supplierWinner", getSupplierWinner);
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
supplierRouter.get("/supplierData", authMiddleware, getSupplierData);
supplierRouter.post("/changePassword", authMiddleware, changePassword);
export default supplierRouter;
