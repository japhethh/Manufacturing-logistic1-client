import expressAsyncHandler from "express-async-handler";
import ReturnRequestModel from "../models/ReturnModel.js";
import supplierModel from "../models/supplierModel.js";
import axios from "axios";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";

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

const updateReturnRequest = expressAsyncHandler(async (req, res) => {
  // Status enum Approved, Rejected
  const { status, userId } = req.body;
  const { id } = req.params;

  // Validate status
  const validStatuses = ["Approved", "Rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid status! Status must be either 'Approved' or 'Rejected'.",
    });
  }

  const existSupplier = await supplierModel.findById(userId);

  if (!existSupplier) {
    return res
      .status(404)
      .json({ success: false, message: "Supplier id not found!" });
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

  if (status === "Approved") {
    const existReturnId = await ReturnRequestModel.findById(id);

    const supplierId = existReturnId?.supplierId;
    const purchaseOrderId = existReturnId?.purchaseOrderId;

    const existPurchaseOrder = await purchaseOrderModel.findByIdAndUpdate(
      purchaseOrderId,
      { orderStatus: "Pending" },
      { new: true }
    );

    if (!existPurchaseOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase Order id not found!" });
    }

    const existSupplier = await supplierModel.findById(supplierId);

    if (!existSupplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier id not found!" });
    }

    existSupplier.purchaseOrders.push(existPurchaseOrder._id);

    await existSupplier.save()

    // Audit
    const newAuditLog = new AuditSupplierLog({
      eventTypes: "Create",
      entityType: "PurchaseOrder",
      entityId: existPurchaseOrder.id,
      changes: {
        oldValue: null,
        newValue: existPurchaseOrder,
      },
      performeBy: userId,
      role: existSupplier?.role,
    });

    await newAuditLog.save();
  }

  res.status(200).json({
    success: true,
    data: updatedStatus,
    message: "Updated Successfully",
  });
});

export { getAllReturnRequest, updateReturnRequest };
