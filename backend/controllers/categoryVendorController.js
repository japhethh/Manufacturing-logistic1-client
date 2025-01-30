import asyncHandler from "express-async-handler";
import categoryModel from "../models/categoryModel.js";
import supplierModel from "../models/supplierModel.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";
const getAllCategory = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const exist = await supplierModel.findById(userId);
  if (!exist) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const categories = await categoryModel.find({ supplier: userId });

  if (!categories) {
    return res
      .status(400)
      .json({ success: false, message: "Categories not found" });
  }

  res.status(200).json({ success: true, data: categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const { userId, status } = req.body;
  const { category_name } = req.body;

  const existSupplier = await supplierModel.findById(userId);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }
  const newCategory = new categoryModel({
    category_name,
    supplier: userId,
  });

  await newCategory.save();

  const newAuditLog = new AuditSupplierLog({
    eventTypes: status,
    entityType: "categories",
    entityId: newCategory._id,
    changes: {
      oldValue: null,
      newValue: newCategory,
    },
    performeBy: userId,
    role: existSupplier.role,
  });

  await newAuditLog.save();

  res.status(201).json({ success: true, message: "Successfully created" });
});

const getSpecificCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await categoryModel.findById(id);

  if (!category) {
    return res
      .status(400)
      .json({ success: false, message: "Category not found" });
  }

  res.status(200).json({ success: true, data: category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, status } = req.body;

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const existCategory = await categoryModel.findById(id);

  if (!existCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Categroy Id not found!" });
  }
  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Category not found" });
  }

  const newAuditLog = new AuditSupplierLog({
    eventTypes: status,
    entityType: "categories",
    entityId: id,
    changes: {
      oldValue: existCategory,
      newValue: deletedCategory,
    },
    performeBy: userId,
    role: existSupplier.role,
  });

  await newAuditLog.save();

  res.status(200).json({ success: true, message: "Category Deleted" });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_code, category_name } = req.body;
  const { userId } = req.body;
  const userExist = await supplierModel.findById(userId);
  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const existCategory = await categoryModel.findById(id);
  if (!existCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    {
      category_code,
      category_name,
    },
    { new: true }
  );

  if (!updatedCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Category not found" });
  }
  const newAuditLog = new AuditSupplierLog({
    eventTypes: "Update",
    entityType: "categories",
    entityId: id,
    changes: {
      oldValue: existCategory,
      newValue: updatedCategory,
    },
    performeBy: userId,
    role: existSupplier.role,
  });

  await newAuditLog.save();

  res.status(200).json({ success: true, message: "Updated Successfully" });
});
export {
  getAllCategory,
  createCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
};
