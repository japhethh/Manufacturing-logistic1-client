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
          week: { $week: "$requestDate" },
          year: { $year: "$requestDate" },
        },
        totalQuantity: {
          $sum: "$material.quantity",
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.week": 1 },
    },
  ]);

  // res.status(200).json(forecast)
  return forecast;
});

const forecastDataMonth = async (req, res) => {
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
        totalQuantity: { $sum: "$material.quantity" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // res.status(200).json(forecast);
  return forecast;
};

export { forecastData, forecastDataMonth };
