import asyncHandler from "express-async-handler";
import financeApprovalModel from "../models/financeApprovalModel.js";
import supplierModel from "../models/supplierModel.js";

const getAllFinanceApproval = asyncHandler(async (req, res) => {
  const getData = await financeApprovalModel.find({}).populate("purchaseOrder");

  if (!getData) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  res.status(200).json(getData);
});

const updateFinanceApproval = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updateFinanceApproval = await financeApprovalModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updateFinanceApproval) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  res.status(200).json({ success: true, data: updateFinanceApproval });
});

const approvedFinance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;

  const exist = await financeApprovalModel.findById(id).populate({
    path: "purchaseOrder", // Populate the purchase order
    populate: {
      path: "supplier", // Populate the supplier inside the purchase order
      model: "Supplier", // Reference to the Supplier model
    },
  });

  if (!exist) {
    return res
      .status(400)
      .json({ success: false, message: "Finance not found " });
  }

  const updateFinanceApproval = await financeApprovalModel.findByIdAndUpdate(
    id,
    { status, comments },
    { new: true }
  );

  if (!updateFinanceApproval) {
    return res
      .status(400)
      .json({ success: false, message: "Finance Approval Not Found!" });
  }

  // res.status(200).json({ success: true, data: updateFinanceApproval });

  const theSupplier = exist.purchaseOrder.supplier;

  const existSupplier = await supplierModel.findById(theSupplier._id);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  existSupplier.purchaseOrders.push(exist.purchaseOrder);

  await existSupplier.save();

  return res.status(200).json({ success: true, data: existSupplier });
});

export { getAllFinanceApproval, updateFinanceApproval, approvedFinance };
