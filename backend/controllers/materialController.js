import asyncHandler from "express-async-handler";
import MaterialModel from "../models/materialModel.js";
import supplierModel from "../models/supplierModel.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import Counter from "../models/Counter.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";

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
    averageDeliveryTime
  } = req.body;

  console.log(req.averageDeliveryTime)

  if (
    !materialName &&
    !materialCode &&
    !description &&
    !unit &&
    !pricePerUnit &&
    !userId &&
    !available &&
    !cost && 
    !averageDeliveryTime
  ) {
    return res.status(400).json("Enter all field!");
  }

  const existSupplier = await supplierModel.findById(userId);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ succes: false, message: "Supplier Id not found!" });
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
    averageDeliveryTime:averageDeliveryTime
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
    .populate("category")
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
    category,
    note,
    averageDeliveryTime
  } = req.body;

  let image = "";

  const counter = await Counter.findByIdAndUpdate(
    { _id: "materialCode" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const materialCode = counter.sequence_value.toString().padStart(3, "0");

  const reference = `MC-${materialCode}`;

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
    materialCode: reference,
    description: description,
    unit: unit,
    pricePerUnit: pricePerUnit,
    supplier: userId,
    available: available,
    tax: tax,
    alertQuantity,
    image,
    cost,
    category,
    note,
    averageDeliveryTime
  });

  const savedMaterial = await newMaterial.save();

  newMaterial.material_id = savedMaterial._id;

  await newMaterial.save();

  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Create",
    entityType: "Material",
    entityId: newMaterial._id,
    changes: {
      oldValue: null,
      newValue: newMaterial,
    },
    performeBy: userId,
    role: supplierUser.role,
  });

  await newAuditLog.save();

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
  const { userId } = req.body;

  const supplierUser = await supplierModel.findById(userId);

  if (!supplierUser) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const materialExist = await MaterialModel.findById(id);
  if (!materialExist) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  await MaterialModel.findByIdAndDelete(id);

  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Delete",
    entityType: "Material",
    entityId: materialExist._id,
    changes: {
      oldValue: materialExist,
      newValue: null,
    },
    performeBy: userId,
    role: supplierUser.role,
  });

  await newAuditLog.save();

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

  console.log(req.body);

  const updatedMaterial = await MaterialModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedMaterial) {
    return res
      .status(400)
      .json({ success: false, message: "Material not found" });
  }

  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Update",
    entityType: "Material",
    entityId: materialData._id,
    changes: {
      oldValue: materialData,
      newValue: updatedMaterial,
    },
    performeBy: userId,
    role: exist.role, 
  });

  await newAuditLog.save();

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
