import asyncHandler from "express-async-handler";

import MaterialModel from "../models/materialModel.js";
import supplierModel from "../models/supplierModel.js";
// Create
const createMaterial = asyncHandler(async (req, res) => {
  const {
    materialName,
    materialCode,
    description,
    unit,
    pricePerUnit,
    supplier,
    available,
  } = req.body;

  if (
    !materialName &&
    !materialCode &&
    !description &&
    !unit &&
    !pricePerUnit &&
    !supplier &&
    !available
  ) {
    return res.status(400).json("Enter all field!");
  }

  const material = new MaterialModel({
    materialName: materialName,
    materialCode: materialCode,
    description: description,
    unit: unit,
    pricePerUnit: pricePerUnit,
    supplier: supplier,
    available: available,
  });

  const result = await material.save();
  res.status(201).json({ success: true, data: result });
});

// Get all material
const getAllMaterial = asyncHandler(async (req, res) => {
  const materials = await MaterialModel.find({})
    .populate("supplier")
    .sort({ orderDate: -1 });
  res.status(200).json(materials);
});
// Get a single material ID

const appendMaterial = asyncHandler(async (req, res) => {
  const {
    materialName,
    materialCode,
    description,
    unit,
    pricePerUnit,
    available,
  } = req.body;
  const { id } = req.params;

  const supplierUser = await supplierModel.findById(id);

  if (!supplierUser) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Not Found" });
  }

  const newMaterial = new MaterialModel({
    materialName: materialName,
    materialCode: materialCode,
    description: description,
    unit: unit,
    pricePerUnit: pricePerUnit,
    supplier: id,
    available: available,
  });

  const savedMaterial = await newMaterial.save();

  supplierUser.materialSupplied.push(savedMaterial._id);

  await supplierUser.save();

  res.status(200).json({ success: true, data: supplierUser });
});

export { createMaterial, getAllMaterial, appendMaterial };
