import express from "express";
import {
  createSupplier,
  getAllSupplier,
  getSupplierById,
} from "../controllers/supplierController.js";

const supplierRouter = express.Router();

supplierRouter.get("/suppliers", getAllSupplier);
supplierRouter.post("/addsuppliers", createSupplier);
supplierRouter.get("/suppliers/:id", getSupplierById);
supplierRouter.post("/suppliers/:id",)


export default supplierRouter;