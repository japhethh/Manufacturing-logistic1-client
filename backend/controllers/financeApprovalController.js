import asyncHandler from "express-async-handler";
import financeApprovalModel from "../models/financeApprovalModel.js";

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

export { getAllFinanceApproval, updateFinanceApproval };
