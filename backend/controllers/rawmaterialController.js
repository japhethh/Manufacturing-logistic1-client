import MaterialModel from "../models/materialModel.js";
import rawmaterialModel from "../models/rawmaterialModel.js";
import asyncHandler from "express-async-handler";

const requested = asyncHandler(async (req, res) => {
  try {
    const request = await rawmaterialModel.find().populate({
      path: "material.materialId", // Populate materialId
      populate: {
        path: "supplier", // Populate supplier inside materialId
        model: "Supplier", // Ensure you reference the correct model name
      },
    });
    // .populate("material.materialId");
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const newRequested = asyncHandler(async (req, res) => {
  const { requestedBy, material, quantity, priority, unit } = req.body;

  const newRequest = new rawmaterialModel({
    requestedBy: requestedBy,
    material: material,
    quantity: quantity,
    priority: priority,
    unit: unit,
  });

  try {
    const save = await newRequest.save();

    res.status(201).json(save);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { requested, newRequested };
