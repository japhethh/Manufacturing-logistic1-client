import invoiceModel from "../models/invoiceVendorModel.js";
import mongoose from "mongoose";
const getMonthlySalesAndRevenue = async (vendorId) => {
  try {
    const months = [
      { month: 1, name: "January" },
      { month: 2, name: "February" },
      { month: 3, name: "March" },
      { month: 4, name: "April" },
      { month: 5, name: "May" },
      { month: 6, name: "June" },
      { month: 7, name: "July" },
      { month: 8, name: "August" },
      { month: 9, name: "September" },
      { month: 10, name: "October" },
      { month: 11, name: "November" },
      { month: 12, name: "December" },
    ];

    const monthlyData = await invoiceModel.aggregate([
      {
        $match: {
          status: "Paid",
          vendor: new mongoose.Types.ObjectId(vendorId),
        },
      }, // Filter invoices with "Paid" status
      { $unwind: "$items" }, // Flatten the items array
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: {
            $sum: {$cond: [
                {
                  $and: [
                    { $gt: ["$items.quantity", 0] },
                    { $gt: ["$items.unitPrice", 0] },
                  ],
                },
                { $multiply: ["$items.quantity", "$items.unitPrice"] },
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalRevenue: 1,
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    const dataWithAllMonths = months.map((m) => {
      const monthData = monthlyData.find((d) => d.month === m.month);
      return {
        month: m.name,
        year: monthData?.year || new Date().getFullYear(),
        totalRevenue: monthData?.totalRevenue || 0,
        totalSales: monthData?.totalSales || 0,
      };
    });

    return dataWithAllMonths;
  } catch (error) {
    console.error("Error fetching monthly sales and revenue:", error);
    return [];
  }
};

const getYearlySalesAndRevenue = async (vendorId) => {
  try {
    const currentYear = new Date().getFullYear();

    const yearlyData = await invoiceModel.aggregate([
      {
        $match: {
          status: "Paid",
          vendor: new mongoose.Types.ObjectId(vendorId),
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59Z`),
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ["$items.quantity", 0] },
                    { $gt: ["$items.unitPrice", 0] },
                  ],
                },
                {
                  $multiply: ["$items.quantity", "$items.unitPrice"],
                },
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          totalRevenue: 1,
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    // Return the yearly sales and revenue
    return yearlyData[0] || { totalRevenue: 0, totalSales: 0 };
  } catch (error) {
    console.error("Error fetching monthly sales and revenue");
  }
};

export { getMonthlySalesAndRevenue, getYearlySalesAndRevenue };
