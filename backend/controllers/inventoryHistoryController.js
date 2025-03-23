import expressAsyncHandler from "express-async-handler";
import historyInventoryModel from "../models/historyInventoryModel.js";

const historyInventoryGet = expressAsyncHandler(async (req, res) => {
  const data = await historyInventoryModel.find({});
  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "History not found!" });
  }

  res.status(200).json(data);
});

export { historyInventoryGet };
