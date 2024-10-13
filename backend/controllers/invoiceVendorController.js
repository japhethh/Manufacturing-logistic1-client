import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";

const createInvoice = asyncHandler(async (req, res) => {
  // const { userId } = req.params;
  // const { invoiceNumber, purchaseOrder, vendor, totalAmount, status } =
  //   req.body;

  res.status(200).json({success:true, message:"Successfully!"})
});

export { createInvoice };
