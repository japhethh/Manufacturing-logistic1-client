import asyncHandler from "express-async-handler";
import TrackingOrderModel from "../models/trackingOrderModel.js";
import supplierModel from "../models/supplierModel.js";
import Invoice from "../models/invoiceVendorModel.js";
import MaterialModel from "../models/materialModel.js";
import trackingOrderHistoryModel from "../models/trackingOrderHistoryModel.js";
import expressAsyncHandler from "express-async-handler";
import AuditSupplierLog from "../models/auditSupplierModel.js";

const getAllTrackingOrders = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const trackingOrders = await TrackingOrderModel.find()
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  if (!trackingOrders) {
    return res
      .status(400)
      .json({ success: false, message: "No tracking orders found!" });
  }

  res.status(200).json(trackingOrders);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, deliveryStatus, date, detail, description, location } =
    req.body;

  // Check if the supplier exists
  const supplierExisting = await supplierModel.findById(userId);
  if (!supplierExisting) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  // Fetch the current tracking order
  const checkExist = await TrackingOrderModel.findById(id);
  if (!checkExist) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking order not found" });
  }

  // If deliveryStatus is alreadyDispatch, skip the stock reduction
  if (deliveryStatus === "Dispatch" && checkExist.alreadyDispatch) {
    return res
      .status(400)
      .json({ success: false, message: "Order has already been dispatched." });
  }

  // Perform stock reduction if transitioning to Dispatch for the first time
  if (deliveryStatus === "Dispatch" && !checkExist.alreadyDispatch) {
    // Retrieve the invoice to access its items
    const invoice = await Invoice.findById(checkExist.invoiceId);
    if (!invoice || !invoice.items) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice or items not found" });
    }

    for (const item of invoice.items) {
      // Attempt to decrement the stock using $inc
      const updateResult = await MaterialModel.findOneAndUpdate(
        { _id: item.product, available: { $gte: item.quantity } }, // Ensure sufficient stock
        { $inc: { available: -item.quantity } }, // Decrement the stock
        { new: true } // Return the updated document
      );

      // Check if the update was successful
      if (!updateResult) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock or material not found for product ID: ${item.product}`,
        });
      }

      console.log(`Product ID: ${item.product}, Reduced by: ${item.quantity}`);
    }
  }

  // Update deliveryStatus and set alreadyDispatch to true if it's "Dispatch"

  const existTrackingOrder = await TrackingOrderModel.findById(id);

  if (!existTrackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking Order Id not found!" });
  }

  const updatedStatus = await TrackingOrderModel.findByIdAndUpdate(
    id,
    {
      deliveryStatus,
      alreadyDispatch:
        deliveryStatus === "Dispatch" ? true : checkExist.alreadyDispatch,
    },
    { new: true }
  )
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  if (!updatedStatus) {
    return res.status(400).json({ success: false, message: "Update failed" });
  }

  updatedStatus.statusHistory.push({
    status: deliveryStatus,
    date,
    details: detail,
    description,
    location,
  });

  await updatedStatus.save();

  const newAuditLog = new AuditSupplierLog({
    eventTypes: deliveryStatus,
    entityType: "Tracking Order",
    entityId: id,
    changes: {
      oldValue: existTrackingOrder,
      newValue: updatedStatus,
    },
    performeBy: userId,
    role: supplierExisting.role,
  });

  await newAuditLog.save();

  // Emit socket event and send a success response
  const io = req.app.get("socketio");
  res
    .status(200)
    .json({ success: true, updatedStatus, message: "Updated Successfully" });

  io.emit("updateStatus", updatedStatus);
});

const getSpecificId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { userId } = req.body;

  const trackingOrder = await TrackingOrderModel.findById(id)
    .populate("generalSettings")
    .populate("invoiceId")
    .populate("purchaseOrderId")
    .populate({
      path: "invoiceId",
      populate: {
        path: "items.product",
        select: "materialName materialCode image category",
        populate: {
          path: "category",
          select: "category_name",
        },
      },
    });

  if (!trackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking Order Id not found!" });
  }

  res.status(200).json(trackingOrder);
});

const getAllTrackingOrderSupplier = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const supplierAccount = await supplierModel.findById(userId);

  if (!supplierAccount) {
    return res
      .status(404)
      .json({ success: false, message: "Supplier Id not found!" });
  }

  const trackingOrders = await TrackingOrderModel.find({ supplier: userId })
    .populate("invoiceId")
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("generalSettings");

  if (!trackingOrders) {
    return res.status(404).json({
      success: false,
      message: "No Tracking orders found for this supplier",
    });
  }

  res.status(200).json(trackingOrders);
});

const deletedTrackingOrderSuperAdmin = expressAsyncHandler(async (req, res) => {
  const { trackingId, status } = req.body;

  if (!trackingId) {
    return res
      .status(400)
      .json({ success: false, message: "Id is required not found" });
  }

  const existingTrackingOrder = await TrackingOrderModel.findById(trackingId);
  if (!existingTrackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking Order Id not found" });
  }

  console.log(existingTrackingOrder);
  // Create a history record without the _id field
  const { _id, ...trackDataWithoutId } = existingTrackingOrder.toObject();

  trackDataWithoutId.trackingOrderHistoryStatus = status;
  const trackHistory = new trackingOrderHistoryModel(trackDataWithoutId);

  await trackHistory.save();

  const deletedTrackingOrder = await TrackingOrderModel.findByIdAndDelete(
    trackingId
  );

  if (!deletedTrackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "TrackingOrder not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Tracking Order Deleted Successfully!" });
});

export {
  getAllTrackingOrders,
  updateStatus,
  getSpecificId,
  getAllTrackingOrderSupplier,
  deletedTrackingOrderSuperAdmin,
};
