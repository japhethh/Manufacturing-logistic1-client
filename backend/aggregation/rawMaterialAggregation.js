import expressAsyncHandler from "express-async-handler";
import rawmaterialModel from "../models/rawmaterialModel.js";

const forecastData = expressAsyncHandler(async (req, res) => {
  const forecast = await rawmaterialModel.aggregate([
    {
      $unwind: "$material",
    },
    {
      $group: {
        _id: {
          month: { $month: "$requestDate" },
          year: { $year: "$requestDate" },
        },
        totalQuantity: {
          $sum: "$material.quantity",
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);
  // res.status(200).json(forecast);
  return forecast;
});

const getMonthRawMaterial = expressAsyncHandler(async (req, res) => {
  const month = await rawmaterialModel.aggregate([
    {
      $unwind: "$material",
    },
    {
      $group: {
        _id: {
          month: { $month: "$requestDate" },    
          year: { $year: "$requestDate" },
        },
        totalQuantity: {
          $sum: "$material.quantity",
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  return res.status(200).json({ success: true, month });
});

export { forecastData, getMonthRawMaterial };
