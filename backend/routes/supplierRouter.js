import express from 'express'
import { getAllSupplier, getSupplierById } from '../controllers/supplierController.js';

const supplierRouter = express.Router();

supplierRouter.get("/suppliers",getAllSupplier);
supplierRouter.get("/suppliers/:id",getSupplierById)