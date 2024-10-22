import asyncHandler from "express-async-handler";
import adjustmentModel from "../models/adjustmentsModel.js";
import supplierModel from "../models/supplierModel.js";
import adjusted_productsModel from "../models/adjusted_productsModel.js";
import MaterialModel from "../models/materialModel.js";
import Counter from "../models/Counter.js";

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
  const adjustmentIds = adjustments.map((adjustment) => adjustment._id);

  // Fetch product items for all adjustments
  const productItem = await adjusted_productsModel.find({
    adjustment_id: { $in: adjustmentIds },
  });

  // Return adjustments and corresponding product items
  res.status(200).json({
    success: true,
    data: adjustments,
    productItem: productItem,
  });
});
// END

// CREATE
const createAdjustment = asyncHandler(async (req, res) => {
  const { userId, details, notes } = req.body;

  if (!details || details.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Product required" });
  }
  const existing = await supplierModel.findById(userId);

  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const counter = await Counter.findByIdAndUpdate(
    {
      _id: "adjustmentNumber",
    },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const adjustmentNumber = counter.sequence_value.toString().padStart(3, "0");

  const reference = `ADJ-${adjustmentNumber}`;

  const createAdjustment = new adjustmentModel({
    note: notes,
    reference,
    supplier: userId,
  });

  await createAdjustment.save();

  for (const item of details) {
    const { _id, quantity, type } = item;

    const updateValue = type === "add" ? quantity : -quantity;
    await MaterialModel.findByIdAndUpdate(
      _id,
      {
        $inc: { available: updateValue },
      },
      { new: true }
    );

    const createNew = new adjusted_productsModel({
      adjustment_id: createAdjustment._id,
      material_id: _id,
      quantity,
      type,
      supplier: userId,
    });

    await createNew.save();
  }

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
  if (!getSpecificData) {
    return res.status(400).json({ success: false, message: "Id not found!" });
  }

  const adjusted_products = await adjusted_productsModel
    .find({
      adjustment_id: id,
    })
    .populate("material_id");

  res
    .status(200)
    .json({ success: true, adjusted_products, adjustment: getSpecificData });

  res.status(200).json({ success: true, data: getSpecificData });
});
// END

// UPDATE
const updateAdjustment = asyncHandler(async (req, res) => {
  const { id } = req.params; // Adjustment ID
  const { userId, details, notes } = req.body;

  // Validate details array
  if (!details || details.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Details required for update" });
  }

  // Check if the supplier exists
  const existingSupplier = await supplierModel.findById(userId);
  if (!existingSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  // Find the existing adjustment
  const existingAdjustment = await adjustmentModel.findById(id);
  if (!existingAdjustment) {
    return res
      .status(404)
      .json({ success: false, message: "Adjustment not found" });
  }

  let adjustmentChanged = false; // Flag to check if adjustmentModel needs saving
  let productUpdated = false; // Flag to check if any adjusted_productsModel changes are needed

  // Update adjustment notes and supplier if needed
  if (notes && notes !== existingAdjustment.note) {
    existingAdjustment.note = notes;
    adjustmentChanged = true;
  }

  if (userId && userId !== existingAdjustment.supplier) {
    existingAdjustment.supplier = userId;
    adjustmentChanged = true;
  }

  // Process the details array
  for (const item of details) {
    const { material_id, quantity, type } = item;
    const materialId = material_id._id; // Assuming material_id is an object containing _id

    // Check if the material already exists in adjusted_productsModel
    const existingProduct = await adjusted_productsModel.findOne({
      adjustment_id: id,
      material_id: materialId,
    });

    // Determine the update value based on the type (add/sub)
    const updateValue =
      type === "add" ? parseInt(quantity) : -parseInt(quantity);

    // Update the material's available quantity in MaterialModel
    await MaterialModel.findByIdAndUpdate(
      materialId,
      { $inc: { available: updateValue } }, // Increment or decrement available stock
      { new: true }
    );

    if (existingProduct) {
      // If the product already exists, check if there's a need to update
      if (
        existingProduct.quantity !== quantity ||
        existingProduct.type !== type
      ) {
        // Update the existing product in adjusted_productsModel
        existingProduct.quantity = quantity;
        existingProduct.type = type;
        await existingProduct.save();
        productUpdated = true; // Flag that a product was updated
      }
    } else {
      // If the product does not exist, create a new one
      const newProduct = new adjusted_productsModel({
        adjustment_id: id,
        material_id: materialId,
        quantity,
        type,
        supplier: userId,
      });
      await newProduct.save();
      productUpdated = true; // Flag that a product was added
    }
  }

  // Save the updated adjustment only if there were changes
  if (adjustmentChanged) {
    await existingAdjustment.save();
  }

  // Respond based on whether there were changes
  if (adjustmentChanged || productUpdated) {
    res.status(200).json({ success: true, message: "Adjustment Updated!" });
  } else {
    res.status(200).json({ success: true, message: "No changes detected." });
  }
});

// END

// DELETE
const deleteAdjustment = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const existing = await supplierModel.findById(userId);
  if (!existing) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const adjustmentExisting = await adjustmentModel.findById(id);

  if (!adjustmentExisting || adjustmentExisting.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "AdjustmentId not found!" });
  }
  await adjustmentModel.findByIdAndDelete(id);
  existing;
  res.status(200).json({ success: true, message: "Deleted Successfully!" });
});
// END
export {
  getAllAdjustment,
  createAdjustment,
  getSpecificAdjustmentId,
  updateAdjustment,
  deleteAdjustment,
};
