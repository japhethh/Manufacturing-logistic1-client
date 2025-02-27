import expressAsyncHandler from "express-async-handler";
import ReturnRequestModel from "../models/ReturnModel.js";
import supplierModel from "../models/supplierModel.js";

const getAllReturnRequest = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier id not found!" });
  }
  const returnRequest = await ReturnRequestModel.find({ supplierId: userId })
    .populate("purchaseOrderId")
    .populate("reportedBy", "name email")
    .populate("returnShipmentId")
    .populate("defects");

  if (!returnRequest) {
    return res
      .status(400)
      .json({ success: false, message: "No return request found!" });
  }

  res.status(200).json(returnRequest);
});

export { getAllReturnRequest };
