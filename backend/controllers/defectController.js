import asyncHandler from "express-async-handler";
import DefectModel from "../models/DefectModel.js";
import userModel from "../models/userModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";
// GET ALL DEFECT
const getAllDefect = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }
  // const exists = await userModel.findById(userId);
  // if (!exists) {
  //   return res.status(400).json({ success: false, message: "User not found!" });
  // }

  // Find all defect records and populate nested fields
  const getAll = await DefectModel.find().populate({
    path: "invoiceId",
    populate: {
      path: "purchaseOrder",
      select: "_id supplier", // Select only _id and supplier in purchaseOrder
      populate: {
        path: "supplier",
        select: "_id", // Select only the _id of supplier
      },
    },
  });

  res.status(200).json(getAll);
});

const createDefect = asyncHandler(async (req, res) => {
  cosnt;
});
const getSpecificId = asyncHandler(async (req, res) => {});
const updateDefect = asyncHandler(async (req, res) => {});

const deleteDefect = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const getSupplierId = await DefectModel.findById(id).populate({
    path: "invoiceId",
    populate: {
      path: "purchaseOrder",
      select: "_id supplier", // Select only _id and supplier in purchaseOrder
      populate: {
        path: "supplier",
        select: "_id", // Select only the _id of supplier
      },
    },
  });
  const io = req.app.get("socketio");

  const supplierId = getSupplierId?.invoiceId?.purchaseOrder?.supplier?._id;

  await DefectModel.findByIdAndDelete(id);

  io.to(supplierId).emit("defectDelete", {
    message: "A defect related to your order has been deleted.",
  });
  res.status(200).json({ success: false, message: "Deleted Successfully" });
});

export {
  getAllDefect,
  createDefect,
  getSpecificId,
  updateDefect,
  deleteDefect,
};
