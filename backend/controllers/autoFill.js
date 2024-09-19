import rawmaterialModel from "../models/rawmaterialModel.js";
export const autoFillPurchaseOrder = async (req, res) => {
  const { rawMaterialRequestId } = req.body;

  try {
    const rawMaterialRequest = await rawmaterialModel
      .findById(rawMaterialRequestId)
      .populate("material.materialId");

    if (!rawMaterialRequest) {
      return res
        .status(404)
        .json({ message: "Raw Material Request not found" });
    }

    const supplier = rawMaterialRequest.material[0].materialId.supplier;

    const items = rawMaterialRequest.material.map((item) => ({
      material: item.materialId._id,
      quantity: item.quantity,
      unitPrice: item.materialId.pricePerUnit,
      totalPrice: item.quantity * item.materialId.pricePerUnit,
    }));

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Create a new purchase order
    const newPurchaseOrder = new PurchaseOrderModel({
      purchaseOrderNumber: generateOrderNumber(), // Generate a unique order number
      rawMaterialRequest: rawMaterialRequest._id,
      supplier: supplier,
      items,
      totalAmount,
      createdBy: req.user._id,
      orderStatus: "Pending",
      approvalStatus: "Pending",
    });
    
    // Save the purchase order
    const savedPurchaseOrder = await newPurchaseOrder.save();

    // Return the newly created purchase order
    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to generate a unique purchase order number
const generateOrderNumber = () => {
  return "PO-" + Date.now();
};
