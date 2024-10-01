import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";
// import rawmaterialModel from "../models/rawmaterialModel.js";
import generatedAndUploadPdf from "../utils/generateAndUploadPdf.js";
import financeApprovalModel from "../models/financeApprovalModel.js";
import axios from "axios";
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
    } = req.body;

    // Check if any required fields are missing
    if (
      !purchaseOrderNumber ||
      !supplier ||
      !orderDate ||
      !items ||
      !category ||
      items.length === 0 ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

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
      status: "Pending",
      totalBudget: savePO.totalAmount,
      documents: savePO.pdfURL,
      category: savePO.category,
    };

    // const financeApproval = await financeApprovalModel.create({
    //   purchaseOrder: savePO._id,
    //   status: "Pending",
    // });

    const financeApproval = await financeApprovalModel.create(
      financeApprovalJson
    );

    savePO.financeApproval = financeApproval._id;
    await savePO.save();

    // Axios
    const postRequest = async () => {
      const response = await axios.post(
        ` https://manufacturing-finance-server.onrender.com/API/BudgetRequests/RequestBudget`,
        financeApproval
      );
      console.log(response);
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
        populate: {
          path: "purchaseOrder",
        },
      })

      .sort({ orderDate: -1, "supplier.supplierName": 1 }) // Sort by orderDate (descending) and supplierName (ascending)
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
