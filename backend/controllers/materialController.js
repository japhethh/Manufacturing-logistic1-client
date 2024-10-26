import asyncHandler from "express-async-handler";
import MaterialModel from "../models/materialModel.js";
import supplierModel from "../models/supplierModel.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

// Create
const createMaterial = asyncHandler(async (req, res) => {
  const {
    materialName,
    materialCode,
    description,
    unit,
    pricePerUnit,
    userId,
    available,
    cost,
  } = req.body;

  if (
    !materialName &&
    !materialCode &&
    !description &&
    !unit &&
    !pricePerUnit &&
    !userId &&
    !available &&
    !cost
  ) {
    return res.status(400).json("Enter all field!");
  }

  const material = new MaterialModel({
    materialName: materialName,
    materialCode: materialCode,
    description: description,
    unit: unit,
    pricePerUnit: pricePerUnit,
    supplier: userId,
    available: available,
    cost,
  });

  const result = await material.save();

  material.material_id = result._id;

  res.status(201).json({ success: true, data: result });
});

// Get all material
const getAllMaterial = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const exist = await supplierModel.findById(userId);
  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const materials = await MaterialModel.find({ supplier: userId })
    .populate("supplier")
    .populate("material_id")
    .sort({ orderDate: -1 });

  if (!materials) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  res.status(200).json(materials);
});

// Get specific Material
const getSpecificMaterial = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);

  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const getMaterial = await MaterialModel.findById(id);

  if (!getMaterial) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found!" });
  }

  res.status(200).json({ success: true, data: getMaterial });
});

// Get all material
const getAllMaterialNoToken = asyncHandler(async (req, res) => {
  const materials = await MaterialModel.find()
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
  let {
    materialName,
    description,
    unit,
    pricePerUnit,
    available,
    tax,
    alertQuantity,
    userId,
    cost,
  } = req.body;

  let image = "";
  // Check if a file is uploaded
  if (req.file) {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "material_images", // You can change the folder name
      });

      // Optionally delete the local file if stored locally
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      // Add the Cloudinary URL to the updated fields
      image = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed", error });
    }
  }

  if (!materialName && !unit && !pricePerUnit && !alertQuantity && !cost) {
    return res
      .status(400)
      .json({ success: false, message: "Enter all field!" });
  }

  const supplierUser = await supplierModel.findById(userId);

  if (!supplierUser) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Not Found" });
  }

  const newMaterial = new MaterialModel({
    materialName: materialName,
    // materialCode: materialCode,
    description: description,
    unit: unit,
    pricePerUnit: pricePerUnit,
    supplier: userId,
    available: available,
    tax:tax,
    alertQuantity,
    image,
    cost,
  });

  const savedMaterial = await newMaterial.save();

  newMaterial.material_id = savedMaterial._id;

  await newMaterial.save();

  supplierUser.materialSupplied.push(savedMaterial._id);

  await supplierUser.save();

  res.status(200).json({
    success: true,
    data: supplierUser,
    message: "Created Successfully",
  });
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
  const { userId } = req.body;

  const exist = await supplierModel.findById(userId);
  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }
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
  getAllMaterialNoToken,
  getSpecificMaterial,
};
