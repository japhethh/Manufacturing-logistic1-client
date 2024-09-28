import { FaWineGlassEmpty } from "react-icons/fa6";
import supplierModel from "../models/supplierModel.js";
import asyncHandler from "express-async-handler";

// Get
const getAllSupplier = asyncHandler(async (req, res) => {
  try {
    const suppliers = await supplierModel
      .find()
      .populate("materialSupplied")
      .sort({ orderDate: -1 });
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


// Create
const createSupplier = asyncHandler(async (req, res) => {
  const {
    supplierName,
    supplierCode,
    contactPerson,
    contactEmail,
    contactPhone,
    address,
    paymentTerms,
    materialSupplied,
    rating,
    email,
    password,
    // materialsSupplied,
  } = req.body;

  const newSupplier = new supplierModel({
    supplierName: supplierName,
    supplierCode: supplierCode,
    contactPerson: contactPerson,
    contactEmail: contactEmail,
    contactPhone: contactPhone,
    address: address,
    paymentTerms: paymentTerms,
    rating: rating,
    materialSupplied: materialSupplied,
    email: email,
    password: password,
  });

  try {
    const saveSuppliers = await newSupplier.save();
    res.status(201).json(saveSuppliers);
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
});


// Update
const updateSupplier = asyncHandler(async (req, res) => {
  const {
    supplierName,
    contactPerson,
    contactEmail,
    contactPhone,
    address,
    paymentTerms,
    rating,
    materialsSupplied,
  } = req.body;

  try {
    const updatedSupplier = await newSupplier.findByIdAndUpdate(
      req.parms.id,
      {
        supplierName,
        contactPerson,
        contactEmail,
        contactPhone,
        address,
        paymentTerms,
        rating,
        materialsSupplied,
      },
      true
    );

    if (!updatedSupplier)
      return res.status(404).json({ errors: "Supplier not found" });

    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.messages });
  }
});

// Supplier Delete
const deleteSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplier = await supplierModel.findByIdAndDelete(id);

  if (!supplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Not Found" });
  }

  res.status(200).json({ success: true, message:`"Deleted Successfully!"${id}` });
});

export {
  getAllSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
