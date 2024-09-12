import supplierModel from "../models/supplierModel.js";
import asyncHandler from "express-async-handler";

const getAllSupplier = asyncHandler(async (req, res) => {
  try {
    const suppliers = await supplierModel.find();
    // .populate('materialsSupplied');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

const getSupplierById = asyncHandler(async (req, res) => {
  try {
    const supplier = await supplierModel.findById(req.params.id);
    // .populate('materialsSupplied');
    if (!supplier) {
      return res.status(400).json({ errors: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

const createSupplier = asyncHandler(async (req, res) => {
  const {supplier}
});

export { getAllSupplier, getSupplierById, createSupplier };
