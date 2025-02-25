import generateServiceToken from "../middleware/gatewayGenerator.js";
import inventoryModel from "../models/inventoryLogisticModel.js";
import inventoryRecordModel from "../models/inventoryRecordModel.js";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";

/**
 * @desc Get all inventory items
 * @route GET /api/inventory
 */
const getAllInventory = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const serviceToken = generateServiceToken();
  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;
  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User ID not found!" });
  }

  const data = await inventoryModel.find({});
  if (!data.length) {
    return res
      .status(400)
      .json({ success: false, message: "Inventory not found!" });
  }

  res.status(200).json(data);
});

/**
 * @desc Add or Update Inventory
 * @route POST /api/inventory
 */
const addOrUpdateInventory = expressAsyncHandler(async (req, res) => {
  const {
    productId,
    inspector,
    productName,
    quantityReceived,
    unit,
    supplierId,
    supplierName,
    warehouseLocation,
    batchNumber,
    expiryDate,
    loggedBy,
  } = req.body;

  if (
    !productId ||
    !productName ||
    !inspector ||
    !quantityReceived ||
    !unit ||
    !supplierId ||
    !warehouseLocation ||
    !loggedBy
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields!" });
  }

  // Check if product exists in inventory
  let existingInventory = await inventoryModel.findOne({ productId });

  if (existingInventory) {
    // Update stock values
    existingInventory.totalStock += quantityReceived;
    existingInventory.availableStock += quantityReceived;

    // Append new batch numbers and expiry dates
    if (batchNumber) existingInventory.batchNumbers.push(batchNumber);
    if (expiryDate) existingInventory.expiryDates.push(expiryDate);

    existingInventory.lastSupplierId = supplierId;
    existingInventory.lastSupplierName = supplierName;
    existingInventory.lastReceivedDate = new Date();
    existingInventory.lastUpdatedBy = loggedBy;

    await existingInventory.save();
  } else {
    // Create new inventory entry if product does not exist
    existingInventory = new inventoryModel({
      productId,
      inspector,
      productName,
      category: "Unknown", // Assuming category is required
      warehouseLocation,
      totalStock: quantityReceived,
      availableStock: quantityReceived,
      unit,
      batchNumbers: batchNumber ? [batchNumber] : [],
      expiryDates: expiryDate ? [expiryDate] : [],
      lastSupplierId: supplierId,
      lastSupplierName: supplierName,
      lastReceivedDate: new Date(),
      lastUpdatedBy: loggedBy,
    });

    await existingInventory.save();
  }

  // Log this inventory addition in inventoryRecordModel
  // const newRecord = new inventoryRecordModel({
  //   invoiceId: `INV-${Date.now()}`,
  //   productId,
  //   productName,
  //   supplierId,
  //   supplierName,
  //   quantityReceived,
  //   unit,
  //   batchNumber,
  //   expiryDate,
  //   warehouseLocation,
  //   inspector: null,
  //   qcStatus: "Pending",
  //   receivedDate: new Date(),
  //   status: "Pending Manual Review",
  //   remarks: "New inventory received",
  //   loggedBy,
  // });

  // await newRecord.save();

  res.status(200).json({
    success: true,
    message: "Inventory updated successfully!",
    inventory: existingInventory,
  });
});

/**
 * @desc Get a single inventory item
 * @route GET /api/inventory/:id
 */
const getInventoryById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const inventory = await inventoryModel.findById(id);

  if (!inventory) {
    return res
      .status(404)
      .json({ success: false, message: "Inventory item not found!" });
  }

  res.status(200).json(inventory);
});

/**
 * @desc Delete Inventory Item
 * @route DELETE /api/inventory/:id
 */
const deleteInventory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const inventory = await inventoryModel.findById(id);

  if (!inventory) {
    return res
      .status(404)
      .json({ success: false, message: "Inventory item not found!" });
  }

  await inventory.deleteOne();

  res.status(200).json({
    success: true,
    message: "Inventory item deleted successfully!",
  });
});

export {
  getAllInventory,
  addOrUpdateInventory,
  getInventoryById,
  deleteInventory,
};
