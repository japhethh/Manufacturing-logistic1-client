import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const FilterAccounts = expressAsyncHandler(async (req, res) => {
  const accounts = await userModel.aggregate([
    // 1st Stage
    // {
    //   $match: { role: "admin" },
    // },

    // 2nd Stage
    {
      $group: {
        _id: "$role",
        // count is the fieldN 
        // The sum is the accumulatorN means he is the calculator of every looping just like a appending
        counts: { $sum: 1 },
      },
    },

    // 3rd Stage
    {
      $sort: {
        counts: -1,
      },
    },

    // 4th Stage
    {
      $limit: 5,
    },

    // 5th Stage
    {
      $skip: 1,
    },
  ]);

  res.status(200).json({ success: true, accounts });
});

export { FilterAccounts };
