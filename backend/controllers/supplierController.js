import supplierModel from "../models/supplierModel.js";
import asyncHandler from "express-async-handler";

const getAllSupplier = asyncHandler(async(req,res) => {
  try {
    const suppliers = await supplierModel.find()
    // .populate('materialsSupplied');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
})


export {getAllSupplier};