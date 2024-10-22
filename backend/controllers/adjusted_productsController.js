import asyncHandler from "express-async-handler";
import adjusted_productsModel from "../models/adjusted_productsModel.js";
import supplierModel from "../models/supplierModel.js";

// GET ALL-------------------------
const getAllAdjustedProducts = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const products = await adjusted_productsModel.find({ supplier: userId });

  res.status(200).json(products);
});
// END

// CREATE-------------------------
const createAdjustedProducts = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { material_id, quantity, type } = req.body;

  const existing = await supplierModel.findById(userId);

  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }
  const createNew = new adjusted_productsModel({
    material_id,
    quantity,
    type,
    supplier: userId,
  });

  await createNew.save();

  res.status(201).json({ success: true, message: "Adjustment Created!" });
});
// END

// GET SPECIFIC ID-------------------------
const getSpecificAdjustment = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);

  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const getSpecificId = await adjusted_productsModel
    .find({ adjustment_id: { $in: id } })
    .populate("material_id")
    .populate("supplier");

  res.status(200).json({ success: true, data: getSpecificId });
});
// END

// UPDATE-------------------------
const updateAdjustedProducts = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { quantity, type } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  await adjusted_productsModel.findByIdAndUpdate(id, { quantity, type });

  res.status(200).json({ success: true, message: "Adjustment Updated!" });
});
// END

// DELETE-------------------------
const deleteAdjustedProducts = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  await adjusted_productsModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Adjustment Deleted!" });
});

export {
  getAllAdjustedProducts,
  createAdjustedProducts,
  getSpecificAdjustment,
  updateAdjustedProducts,
  deleteAdjustedProducts,
};
