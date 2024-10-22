import asyncHandler from "express-async-handler";
import adjustmentModel from "../models/adjustmentsModel.js";
import supplierModel from "../models/supplierModel.js";
import adjusted_productsModel from "../models/adjusted_productsModel.js";

// GETALL
const getAllAdjustment = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Check if supplier exists
  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  // Fetch adjustments for the supplier
  const adjustments = await adjustmentModel.find({ supplier: userId });

  if (!adjustments || adjustments.length === 0) {
    return res
      .status(200)
      .json({ success: true, message: "No adjustments found", data: [] });
  }

  // Extract adjustment IDs from the adjustments array
  const adjustmentIds = adjustments.map(adjustment => adjustment._id);

  // Fetch product items for all adjustments
  const productItem = await adjusted_productsModel.find({
    adjustment_id: { $in: adjustmentIds }
  });

  // Return adjustments and corresponding product items
  res.status(200).json({
    success: true,
    data: adjustments,
    productItem: productItem
  });
});
// END


// CREATE
const createAdjustment = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { material_id, quantity, type, note } = req.body;

  const existing = await supplierModel.findById(userId);

  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const createAdjustment = new adjustmentModel({
    note: note,
    supplier: userId,
  });

  await createAdjustment.save();

  const createNew = new adjusted_productsModel({
    adjustment_id: createAdjustment._id,
    material_id: material_id,
    quantity,
    type,
    supplier: userId,
  });

  await createNew.save();

  res.status(201).json({ success: true, message: "Adjustment Created!" });
});
// END

// GET SPECIFIC ID
const getSpecificAdjustmentId = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const getSpecificData = await adjustmentModel.findById(id);

  res.status(200).json({ success: true, data: getSpecificData });
});
// END

// UPDATE
const updateAdjustment = asyncHandler(async (req, res) => {

});
// END

// DELETE
const deleteAdjustment = asyncHandler(async (req, res) => {});
// END
export {
  getAllAdjustment,
  createAdjustment,
  getSpecificAdjustmentId,
  updateAdjustment,
  deleteAdjustment,
};
