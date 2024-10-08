import shipmentHistoryModel from "../models/shipmentHistoryModel.js";
import shipmentModel from "../models/shipmentModel.js";
import asyncHandler from "express-async-handler";

// FORMAT
// CREATE
// READ
// UPDATE
// DELETE

// CREATE
const createShipment = asyncHandler(async (req, res) => {
  try {
    const {
      purchaseOrder,
      shipmentStatus,
      trackingNumber,
      carrier,
      shippedDate,
      deliveryDate,
      notes,
    } = req.body;

    const shipment = new shipmentModel({
      purchaseOrder,
      shipmentStatus: shipmentStatus || "Shipped",
      trackingNumber,
      carrier,
      shippedDate,
      deliveryDate,
      notes,
    });

    await shipment.save();

    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ
const getAllShipment = asyncHandler(async (req, res) => {
  const allData = await shipmentModel.find({});

  if (!allData) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment Not Found" });
  }

  res.status(200).json(allData);
});

// UPDATE
const updateShipment = asyncHandler(async (req, res) => {
  const { shipmentStatus, changedBy, comments } = req.body;
  const { id } = req.params;
  const shipmentData = await shipmentModel.findById(req.params.id);
  const previousStatus = shipmentData.shipmentStatus;
  if (!shipmentData) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment Not Found" });
  }
  const shipment = await shipmentModel.findByIdAndUpdate(
    id,
    { shipmentStatus },
    { new: true }
  );

  if (!shipment) {
    return res
      .status(400)
      .json({ success: false, message: "Shipment Not Found" });
  }

  const history = new shipmentHistoryModel({
    shipmentId: shipment._id,
    previousStatus,
    newStatus: shipment.shipmentStatus,
    changedBy,
    comments,
  });

  await history.save();
  res.status(201).json(shipment);
});

// DELETE
const deleteShipment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vdeleteShipment = await shipmentModel.findByIdAndDelete(id);

  if (!vdeleteShipment) {
    return res.status(400).json({ success: false, message: "Not Found" });
  }

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

// export const updateShipmentStatus = async (req, res) => {
//   const { shipmentId } = req.params;
//   const { shipmentStatus, trackingNumber, carrier, shippedDate, deliveryDate, notes } = req.body;

//   try {
//     const shipment = await Shipment.findById(shipmentId).populate('purchaseOrder');
//     if (!shipment) {
//       return res.status(404).json({ success: false, message: "Shipment not found." });
//     }

//     // Update shipment fields
//     if (shipmentStatus) shipment.shipmentStatus = shipmentStatus;
//     if (trackingNumber) shipment.trackingNumber = trackingNumber;
//     if (carrier) shipment.carrier = carrier;
//     if (shippedDate) shipment.shippedDate = shippedDate;
//     if (deliveryDate) shipment.deliveryDate = deliveryDate;
//     if (notes) shipment.notes = notes;

//     const updatedShipment = await shipment.save();

//     // If shipment is delivered, handle related actions
//     if (shipmentStatus === "Delivered") {
//       // Update Purchase Order Status if all shipments are delivered
//       const allShipments = await Shipment.find({ purchaseOrder: shipment.purchaseOrder._id });
//       const allDelivered = allShipments.every(s => s.shipmentStatus === "Delivered");

//       if (allDelivered) {
//         shipment.purchaseOrder.orderStatus = "Complete";
//         await shipment.purchaseOrder.save();
//       }

//       // Update Inventory: This assumes you have an Inventory model and logic
//       // await updateInventory(shipment.purchaseOrder);
//     }

//     res.json({ success: true, data: updatedShipment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


export { createShipment, getAllShipment, updateShipment, deleteShipment };
