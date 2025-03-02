import expressAsyncHandler from "express-async-handler";
import ReturnRequestModel from "../models/ReturnModel.js";
import supplierModel from "../models/supplierModel.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";

const getAllReturnRequest = expressAsyncHandler(async (req, res) => {
  const data = await ReturnRequestModel.find({});

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No return request found!" });
  }

  res.status(200).json(data);
});

const updateReturnRequest = expressAsyncHandler(async (req, res) => {
  // Status enum Approved, Rejected
  const { status, userId } = req.body;
  const { id } = req.params;

  // Validate status
  const validStatuses = ["Re_Order", "Refund"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status! Status must be either 'Re_Order' or 'Refund'.",
    });
  }

  const updatedStatus = await ReturnRequestModel.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true }
  );

  if (!updatedStatus) {
    return res
      .status(404)
      .json({ success: false, message: "Status not updated!" });
  }

  res.status(200).json({
    success: true,
    data: updatedStatus,
    message: "Updated Successfully",
  });
});
export { getAllReturnRequest, updateReturnRequest };
