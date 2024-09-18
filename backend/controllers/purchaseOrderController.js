import mongoose from "mongoose";
import purchaseOrderModel from "../models/purchaseOrderModel.js";
import asyncHandler from "express-async-handler";


const getAllPurchaseOrder = asyncHandler(async(req,res) => {
  const purchaseOrder = await purchaseOrderModel.find();
  
})