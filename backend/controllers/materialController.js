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

  if (!materials) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

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
    tax,
    alertQuantity,
    image,
  } = req.body;

  const { id } = req.params;

  if ((!materialName || !materialCode, !unit, !pricePerUnit, !alertQuantity)) {
    return res.status(400).json("Enter all field!");
  }

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
    tax,
    alertQuantity,
    image,
  });

  const savedMaterial = await newMaterial.save();

  supplierUser.materialSupplied.push(savedMaterial._id);

  await supplierUser.save();

  res.status(200).json({ success: true, data: supplierUser });
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const materialExist = await MaterialModel.findById(id);
  if (!materialExist) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  await MaterialModel.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "Material" + materialExist.materialCode });
});

const updateMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const materialData = await MaterialModel.findById(id);
  if (!materialData) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  const updatedMaterial = await MaterialModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedMaterial) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: updatedMaterial,
  });
});

export {
  createMaterial,
  getAllMaterial,
  appendMaterial,
  deleteMaterial,
  updateMaterial,
};
