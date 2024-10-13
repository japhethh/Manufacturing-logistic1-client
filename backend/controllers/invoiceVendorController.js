import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceVendorModel.js";



const {createInvoice} = asyncHandler(async(req, res) => {
  const {userId} = req.params;
  // const {
  //   invoiceNumber,
  //   purchaseOrder,
  //   vendor,
  //   items
  // }
})

export {createInvoice};