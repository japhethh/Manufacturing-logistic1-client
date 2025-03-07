import QCInspectionModel from "../models/QCInspectionModel.js";
import DefectModel from "../models/DefectModel.js";
import expressAsyncHandler from "express-async-handler";
import Counter from "../models/Counter.js";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import inventoryRecordModel from "../models/inventoryRecordModel.js";
import Invoice from "../models/invoiceVendorModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";
import ReturnRequestModel from "../models/ReturnModel.js";
import inventoryModel from "../models/inventoryLogisticModel.js";

const qcCreate = expressAsyncHandler(async (req, res) => {
  try {
    const { inspector, status, discrepancies, invoiceId, userId } = req.body;

    console.log(inspector);
    console.log(status);
    console.log(discrepancies);
    const warehouseLocation = "Warehouse A - Shelf B3";

    // Fetch Invoice and Populate Supplier & Items
    const getInvoice = await Invoice.findById(invoiceId)
      .populate("items.product") // Get product details
      .populate("vendor"); // Get supplier details

    if (!getInvoice) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice ID not found!" });
    }

    // Generate Unique Inspection Code
    const counter = await Counter.findByIdAndUpdate(
      { _id: "inspectionCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const inspectionNumber = counter.sequence_value.toString().padStart(3, "0");
    const inspectionCode = `INS-${inspectionNumber}`;

    // Create QC Inspection Record
    const newQCInspection = new QCInspectionModel({
      inspectionCode,
      invoiceId,
      inspector,
      status,
      discrepancies: discrepancies || [],
    });

    const saveNewQualityControl = await newQCInspection.save();
    newQCInspection.inspectionId = saveNewQualityControl._id;
    await newQCInspection.save();

    // ✅ Create Inventory Records for Each Product in Invoice
    for (const item of getInvoice.items) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "batchNumber" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      const batchNumber = counter.sequence_value.toString().padStart(3, "0");
      const batchCode = `BATCH-${batchNumber}`;

      const newInventoryRecord = new inventoryRecordModel({
        invoiceId,
        productId: item.productId.toString(),
        productName: item.productName,
        supplierId: getInvoice.vendor._id.toString(),
        supplierName: getInvoice.vendor.supplierName,
        quantityReceived: item.quantity,
        unit: item.unit || "pcs",
        batchNumber: batchCode,
        expiryDate: null,
        warehouseLocation: warehouseLocation,
        inspector,
        qcStatus: "Pending",
        receivedDate: new Date(),
        status: "Pending Manual Review",
        remarks: "Awaiting approval",
        loggedBy: "Unknown",
      });

      await newInventoryRecord.save();

      // Start

      // Check if product exists in inventory
      let existingInventory = await inventoryModel.findOne({
        productId: newInventoryRecord?.productId,
      });

      if (existingInventory) {
        // Update stock values
        existingInventory.totalStock += newInventoryRecord?.quantityReceived;
        existingInventory.availableStock +=
          newInventoryRecord?.quantityReceived;

        // Append new batch numbers and expiry dates
        if (batchNumber) existingInventory.batchNumbers.push(batchNumber);
        if (newInventoryRecord?.expiryDate)
          existingInventory.expiryDates.push(newInventoryRecord?.expiryDate);

        existingInventory.lastSupplierId = newInventoryRecord?.supplierId;
        existingInventory.lastSupplierName = newInventoryRecord?.supplierName;
        existingInventory.lastReceivedDate = new Date();
        existingInventory.lastUpdatedBy = newInventoryRecord?.loggedBy;

        await existingInventory.save();
      } else {
        // Create new inventory entry if product does not exist
        existingInventory = new inventoryModel({
          productId: newInventoryRecord?.productId,
          inspector: newInventoryRecord?.inspector,
          productName: newInventoryRecord?.productName,
          category: "Unknown", // Assuming category is required
          warehouseLocation: newInventoryRecord?.warehouseLocation,
          totalStock: newInventoryRecord?.quantityReceived,
          availableStock: newInventoryRecord?.quantityReceived,
          unit: newInventoryRecord?.unit,
          batchNumbers: newInventoryRecord?.batchNumber
            ? [newInventoryRecord?.batchNumber]
            : [],
          expiryDates: newInventoryRecord?.expiryDate
            ? [newInventoryRecord?.expiryDate]
            : [],
          lastSupplierId: newInventoryRecord?.supplierId,
          lastSupplierName: newInventoryRecord?.supplierName,
          lastReceivedDate: new Date(),
          lastUpdatedBy: newInventoryRecord?.loggedBy,
        });

        await existingInventory.save();
      }

      // End
    }

    res.status(201).json({
      message: "QC inspection and inventory records created successfully!",
      inspectionId: newQCInspection.inspectionId,
      invoiceId: invoiceId,
      inspectionCode: newQCInspection.inspectionCode,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error recording QC inspection: " + error.message });
  }
});

// const qcCreate = expressAsyncHandler(async (req, res) => {
//   try {
//     const { productId, inspector, status, discrepancies, invoiceId } = req.body;

//     // console.log(req.body);

//     const counter = await Counter.findByIdAndUpdate(
//       { _id: "inspectionCode" },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     const getInvoice = await Invoice.findById(invoiceId);

//     if (!getInvoice) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invoice id not found!" });
//     }

//     const inspectionNumber = counter.sequence_value.toString().padStart(3, "0");
//     const inspectionCode = `INS-${inspectionNumber}`;

//     const newQCInspection = new QCInspectionModel({
//       inspectionCode,
//       invoiceId,
//       inspector,
//       status,
//       discrepancies: discrepancies || [],
//     });

//     const saveNewQualityControl = await newQCInspection.save();

//     newQCInspection.inspectionId = saveNewQualityControl._id;

//     await newQCInspection.save();

//     // console.log(newQCInspection);

//     res.status(201).json({
//       message: "QC inspection recorded successfully!",
//       inspectionId: newQCInspection.inspectionId,
//       invoiceId: invoiceId,
//       inspectionCode: newQCInspection.inspectionCode,
//     });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error recording QC inspection: " + error.message });
//   }
// });

// Create Defect
const defectCreate = expressAsyncHandler(async (req, res) => {
  try {
    const {
      defectDescription,
      invoiceId,
      inspector,
      inspectionId,
      severity,
      userId,
    } = req.body;

    // Generate defect code
    const counter = await Counter.findByIdAndUpdate(
      { _id: "defectCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const defectNumber = counter.sequence_value.toString().padStart(3, "0");
    const defectCode = `DEF-${defectNumber}`;

    const uploadedImages = [];

    // Upload images to Cloudinary, each file individually
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "defect_images", // Specify the Cloudinary folder
      });
      uploadedImages.push(result.secure_url); // Add Cloudinary URL to the array

      // Optionally delete the local file after upload
      fs.unlinkSync(file.path);
    }

    // Create the defect with the uploaded image URLs
    const defect = new DefectModel({
      defectDescription,
      inspector,
      invoiceId,
      inspectionId,
      severity,
      defectCode,
      images: uploadedImages,
    });

    const savedDefect = await defect.save();

    let returnRequest = null;

    const existInvoice = await Invoice.findById(invoiceId);

    if (!existInvoice) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice id not found!" });
    }

    const returnCounter = await Counter.findByIdAndUpdate(
      {
        _id: "returnRequestNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const returnRequestNumber = returnCounter.sequence_value
      .toString()
      .padStart(3, "0");

    const returnReference = `R-${returnRequestNumber}`;

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
        .json({ success: false, message: "User id not found!" });
    }

    // 🔹 Auto-create a return request for **Major or Critical** defects
    if (severity === "Major" || severity === "Critical") {
      returnRequest = new ReturnRequestModel({
        defects: defect?._id,
        returnRequestNumber: returnReference,
        purchaseOrderId: existInvoice?.purchaseOrder, // Assuming invoice links to PO
        supplierId: existInvoice?.vendor, // Get supplier ID dynamically
        reportedBy: userExist,
        reason: `${defectDescription}`,
        notes: "Auto-generated return request due to defect severity",
        severity,
        attachments: uploadedImages,
        status: "Pending",
      });

      await returnRequest.save();

      await defect.save();

      // 🔹 Link defect to return request
      // defect.returnRequest = returnRequest._id;
    }

    // NEEDED TO PUT A NOTIFICATION HERE ---------------------------------->

    res.status(201).json({
      message: "Defect reported successfully!",
      defectId: savedDefect._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error reporting defect: " + error.message });
  }
});

const defectCreated = expressAsyncHandler(async (req, res) => {
  try {
    const {
      defectDescription,
      invoiceId,
      inspector,
      severity,
      department,
      reportedBy,
    } = req.body;

    // Generate defect code
    const counter = await Counter.findByIdAndUpdate(
      { _id: "defectCode" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const defectNumber = counter.sequence_value.toString().padStart(3, "0");
    const defectCode = `DEF-${defectNumber}`;

    const uploadedImages = [];

    // Upload images to Cloudinary, each file individually

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "defect_images", // Specify the Cloudinary folder
        });
        uploadedImages.push(result.secure_url); // Add Cloudinary URL to the array

        // Optionally delete the local file after upload
        fs.unlinkSync(file.path);
      }
    }

    // Create the defect with the uploaded image URLs
    const defect = new DefectModel({
      defectDescription,
      inspector,
      invoiceId,
      severity,
      defectCode,
      department,
      images: uploadedImages,
    });

    const savedDefect = await defect.save();

    let returnRequest = null;

    const existInvoice = await Invoice.findById(invoiceId);

    if (!existInvoice) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice id not found!" });
    }

    const returnCounter = await Counter.findByIdAndUpdate(
      {
        _id: "returnRequestNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const returnRequestNumber = returnCounter.sequence_value
      .toString()
      .padStart(3, "0");

    const returnReference = `R-${returnRequestNumber}`;

    const serviceToken = generateServiceToken();

    const response = await axios.get(
      `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
      { headers: { Authorization: `Bearer ${serviceToken}` } }
    );

    const accountData = response.data;

    // const userExist = accountData.find((a) => a._id === userId);

    // if (!userExist) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User id not found!" });
    // }

    // 🔹 Auto-create a return request for **Major or Critical** defects
    if (severity === "Major" || severity === "Critical") {
      returnRequest = new ReturnRequestModel({
        defects: defect?._id,
        returnRequestNumber: returnReference,
        purchaseOrderId: existInvoice?.purchaseOrder, // Assuming invoice links to PO
        supplierId: existInvoice?.vendor, // Get supplier ID dynamically
        reportedBy: reportedBy,
        reason: `${defectDescription}`,
        notes: "Auto-generated return request due to defect severity",
        severity,
        attachments: uploadedImages,
        status: "Pending",
      });

      await returnRequest.save();

      await defect.save();

      // 🔹 Link defect to return request
      // defect.returnRequest = returnRequest._id;
    }

    // NEEDED TO PUT A NOTIFICATION HERE ---------------------------------->

    res.status(201).json({
      message: "Defect reported successfully!",
      defectId: savedDefect._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error reporting defect: " + error.message });
  }
});
export { qcCreate, defectCreate, defectCreated };
