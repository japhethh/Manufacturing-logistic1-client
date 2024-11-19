import asyncHandler from "express-async-handler";
import TrackingOrderModel from "../models/trackingOrderModel.js";
import supplierModel from "../models/supplierModel.js";
import Invoice from "../models/invoiceVendorModel.js";
import MaterialModel from "../models/materialModel.js";

const getAllTrackingOrders = asyncHandler(async (req, res) => {
  // const { id } = req.params;

  const trackingOrders = await TrackingOrderModel.find()
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  res.status(200).json(trackingOrders);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, deliveryStatus } = req.body;
  const supplierExisting = await supplierModel.findById(userId);
  if (!supplierExisting) {
    return res
      .status(400)
      .json({ success: false, message: "Supplier not found" });
  }

  const updatedStatus = await TrackingOrderModel.findByIdAndUpdate(
    id,
    { deliveryStatus },
    { new: true }
  )
    .populate("supplier")
    .populate("purchaseOrderId")
    .populate("invoiceId")
    .populate("generalSettings");

  if (!updatedStatus) {
    return res.status(400).json({ success: false, message: "Update failed" });
  }
  console.log(updatedStatus.invoiceId.items.length);

  // Retrieve the invoice to access its items
  const invoice = await Invoice.findById(updatedStatus.invoiceId.id);
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

  const io = req.app.get("socketio");
  res
    .status(200)
    .json({ success: true, updatedStatus, message: "Updated Successfully" });

  io.emit("updateStatus", updatedStatus);
});

const getSpecificId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const trackingOrder = await TrackingOrderModel.findById(id);
  if (!trackingOrder) {
    return res
      .status(400)
      .json({ success: false, message: "Tracking Order Id not found!" });
  }

  res.status(200).json({ success: true, data: trackingOrder });
});

export { getAllTrackingOrders, updateStatus, getSpecificId };
