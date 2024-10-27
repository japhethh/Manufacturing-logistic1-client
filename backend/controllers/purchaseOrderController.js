import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
// import rawmaterialModel from "../models/rawmaterialModel.js";
import generatedAndUploadPdf from "../utils/generateAndUploadPdf.js";
import financeApprovalModel from "../models/financeApprovalModel.js";
import axios from "axios";
import generalSettingsModel from "../models/generalSettingsModel.js";
// Create Purchase Order Controller
const createPurchaseOrder = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      purchaseOrderNumber,
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

    // Check if any required fields are missing
    if (
      !purchaseOrderNumber ||
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

    const newPurchaseOrder = new purchaseOrderModel({
      purchaseOrderNumber: purchaseOrderNumber,
      supplier: supplier,
      orderDate: orderDate,
      items: items,
      tax: tax,
      totalAmount: totalAmount, // Calculate totalAmount on the server if not included
      notes: notes,
      paymentTerm: paymentTerm,
      approvalStatus: approvalStatus,
      createdBy: userId,
      category: category,
      paymentDetails: paymentDetails,
      companyAccount: companyAccountId,
      // companyAccount: addressAccount._id,
    });

    const savePO = await newPurchaseOrder.save();

    // Populate supplier details
    await savePO.populate("supplier");

    // Generate and Upload PDF
    const pdfURL = await generatedAndUploadPdf(savePO);

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

    financeApproval.approvalId = financeApproval._id;

    financeApproval.save();

    savePO.financeApproval = financeApproval._id;
    await savePO.save();

    console.log(financeApproval);

    // FINANCE ------------------->
    // Axios
    // const postRequest = async () => {
    //   const response = await axios.post(
    //     `https://backend-finance.jjm-manufacturing.com/API/BudgetRequests/RequestBudget`,
    //     financeApproval
    //   );
    //   console.log(response.data);
    // };
    // postRequest();

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
export {
  createPurchaseOrder,
  getAllPurchaseOrder,
  fetchSpecificPo,
  getSpecificPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  updateStatus,
};
