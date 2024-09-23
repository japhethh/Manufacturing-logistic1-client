import asyncHandler from "express-async-handler";

import MaterialModel from "../models/materialModel.js";
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

  const material =  new MaterialModel({
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
  const materials = await MaterialModel.find({}).populate("supplier").sort({ orderDate: -1 });;
  res.status(200).json(materials);
});
// Get a single material ID

export { createMaterial, getAllMaterial };
