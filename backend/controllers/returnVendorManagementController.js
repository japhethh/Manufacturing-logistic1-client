import expressAsyncHandler from "express-async-handler";
import ReturnRequestModel from "../models/ReturnModel.js";
import supplierModel from "../models/supplierModel.js";

const getAllReturnRequest = expressAsyncHandler(async (req, res) => {
  const { supplierId } = req.body;

  const existSupplier = await supplierModel.findById(supplierId);
  if (!existSupplier) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found!" });
  }

  const returnRequest = await ReturnRequestModel.find({ supplierId })
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
