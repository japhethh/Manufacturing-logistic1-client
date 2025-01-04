import expressAsyncHandler from "express-async-handler";
import invoiceVendorModel from "../models/invoiceVendorModel.js";

const invoiceVendorPending = expressAsyncHandler(async (req, res) => {
  const pendingInvoices = await invoiceVendorModel.aggregate([
    {
      $match: {
        approvalStatus: "Pending",
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
      },
    },
  ]);

  res.status(200).json(pendingInvoices);
});

const invoiceVendorApproved = expressAsyncHandler(async (req, res) => {
  const approvedInvoice = await invoiceVendorModel.aggregate([
    {
      $match: {
        approvalStatus: "Approved",
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
      },
    },
  ]);

  res.status(200).json(approvedInvoice);
});

const invoiceVendorAll = expressAsyncHandler(async (req, res) => {
  const allInvoices = await invoiceVendorModel.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
      },
    },
  ]);

  res.status(200).json(allInvoices);
});

export { invoiceVendorPending, invoiceVendorApproved, invoiceVendorAll };
