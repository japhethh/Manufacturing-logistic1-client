import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
// import rawmaterialModel from "../models/rawmaterialModel.js";
import generatedAndUploadPdf from "../utils/generateAndUploadPdf.js";
import financeApprovalModel from "../models/financeApprovalModel.js";
import axios from "axios";
import generalSettingsModel from "../models/generalSettingsModel.js";
import jwt from "jsonwebtoken";
import Counter from "../models/Counter.js";
import expressAsyncHandler from "express-async-handler";
// Create Purchase Order Controller
const createPurchaseOrder = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      // purchaseOrderNumber,
      supplier,
      orderDate,
      items,
      category,
      tax,
      totalAmount,
      notes,
      paymentTerm,
      approvalStatus,
      userId, // Assuming you're getting user info from the token
      reason,
      paymentDetails,
    } = req.body;

    console.log(req.body);

    // Check if any required fields are missing
    if (
      !supplier ||
      !orderDate ||
      !items ||
      !category ||
      items.length === 0 ||
      !totalAmount ||
      !paymentDetails
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // const companyAccountId = "66f1ef49f50be7fc60baedb3";
    // const addressAccount = await generalSettingsModel.findById(
    //   companyAccountId
    // );

    // if (!addressAccount) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Info Not Found!" });
    // }
    const generalSetting = await generalSettingsModel.find();
    if (!generalSetting) {
      return res
        .status(400)
        .json({ success: false, message: "Company Account not found" });
    }
    const companyAccountId = generalSetting[0]._id;

    const counter = await Counter.findByIdAndUpdate(
      {
        _id: "purchaseNumber",
      },
      {
        $inc: { sequence_value: 1 },
      },
      { new: true, upsert: true }
    );

    const purchaseNumber = counter.sequence_value.toString().padStart(3, "0");

    const reference = `PO-${purchaseNumber}`;

    const newPurchaseOrder = new purchaseOrderModel({
      purchaseOrderNumber: reference,
      supplier: supplier,
      orderDate: orderDate,
      items: items,
      tax: tax,
      totalAmount: totalAmount,
      notes: notes,
      paymentTerm: paymentTerm,
      approvalStatus: approvalStatus,
      createdBy: userId,
      category: category,
      paymentDetails: paymentDetails,
      companyAccount: companyAccountId,
    });

    const savePO = await newPurchaseOrder.save();

    // Populate supplier details
    await savePO.populate("supplier");

    // Generate and Upload PDF
    const pdfURL = "Kupal si raffy";
    // const pdfURL = await generatedAndUploadPdf(savePO);

    // Update PO with PDF URL
    savePO.pdfURL = pdfURL;

    await savePO.save();

    const financeApprovalJson = {
      purchaseOrder: savePO._id,
      typeOfRequest: "request",
      category: savePO.category,

      department: "Logistic1",
      totalBudget: savePO.totalAmount,
      documents: savePO.pdfURL,
      status: "Pending",
      comment: savePO.notes,
      reason: reason,
    };

    const financeApproval = await financeApprovalModel.create(
      financeApprovalJson
    );

    financeApproval.approvalId = financeApprovalJson.purchaseOrder;

    financeApproval.save();

    savePO.financeApproval = financeApproval._id;
    await savePO.save();

    console.log(financeApproval);

    // Raffy tanga
    const generateServiceToken = () => {
      const payload = { service: "Logistics 1" };
      return jwt.sign(payload, process.env.GATEWAY_JWT_SECRET, {
        expiresIn: "1h",
      });
    };

    // FINANCE ------------------->
    // Axios

    const postRequest = async () => {
      const tite = generateServiceToken();
      const response = await axios.post(
        `https://manufacturing-api-gateway.onrender.com/logistics/request-budget`,
        financeApproval,
        { headers: { Authorization: `Bearer ${tite}` } }
      );

      console.log(response.data);
    };

    postRequest();

    res.status(201).json(newPurchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all purchase orders
const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const purchaseOrders = await purchaseOrderModel
      .find()
      .populate("createdBy", "name email")
      .populate("supplier")
      .populate({
        path: "financeApproval",
      })
      .sort({ createdAt: -1 })
      // .sort({ orderDate: -1, "supplier.supplierName": 1 }) // Sort by orderDate (descending) and supplierName (ascending)
      .exec(); // Populate the createdBy field with user info
    // .populate("rawmaterialRequest", "name description"); // Populate the raw material request

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error("Error retrieving purchase orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const fetchSpecificPo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);

    const PO = await purchaseOrderModel
      .findById(id)
      .populate(
        "supplier",
        "supplierName contactEmail contactPhone paymentTerms address"
      );

    if (!PO) {
      return res
        .status(400)
        .json({ success: false, message: "Purchase order Not Found" });
    }

    res.status(200).json(PO);
  } catch (error) {
    console.log("Errors");
  }
});
const getSpecificPurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const info = await purchaseOrderModel.findById(id);

  if (!info) {
    return res
      .status(400)
      .json({ success: false, message: "Purchase Id Not Found" });
  }
  res.status(200).json(info);
});

const updatePurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const getPurchaseOrderId = await purchaseOrderModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    // console.log(getPurchaseOrderId._id)
    res.status(200).json({
      success: true,
      message: "Update Successfully",
      data: getPurchaseOrderId._id,
    });
    console.log(getPurchaseOrderId.id);
  } catch (error) {
    res.status(400).json("Errors fuckk");
  }
});

const deletePurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const Deleted = await purchaseOrderModel.findByIdAndDelete(id);
  if (!Deleted) {
    return res
      .status(400)
      .json({ success: false, message: "Purchase Order Not Found" });
  }
  res.status(200).json({ success: true, message: "Deleted Successfully!" });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { orderStatus } = req.body;

  const updatedStatus = await purchaseOrderModel.findByIdAndUpdate(
    id,
    {
      orderStatus: orderStatus,
    },
    { new: true }
  );

  if (!updatedStatus) {
    return res.status(400).json({ success: false, message: "Not found!" });
  }

  res.status(200).json(updatedStatus);
});

const updateStatusFinance = expressAsyncHandler(async (req, res) => {
  const { status, comment, approvalId } = req.body;

  const exist = await purchaseOrderModel.findById(approvalId);

  if (!exist) {
    return res
      .status(404)
      .json({ success: false, message: "Purchase Order not found!" });
  }

  const update = await purchaseOrderModel.findByIdAndUpdate(approvalId, {
    approvalStatus: status,
    approvalId,
    comment,
  });

  if (!update) {
    return res
      .status(404)
      .json({ success: false, message: "Purchase not found!" });
  }

  res.status(200).json({ success: true, data: update });
});

const rejectStatusFinance = expressAsyncHandler(async (req, res) => {
  const { status, comment, approvalId } = req.body;

  const exist = await purchaseOrderModel.findById(approvalId);

  if (!exist) {
    return res
      .status(404)
      .json({ success: false, message: "Purchase Id not found!" });
  }

  const update = await purchaseOrderModel.findByIdAndUpdate(approvalId);
});

export {
  createPurchaseOrder,
  getAllPurchaseOrder,
  fetchSpecificPo,
  getSpecificPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  updateStatus,
  updateStatusFinance,
};
