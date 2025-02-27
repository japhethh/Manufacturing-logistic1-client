import expressAsyncHandler from "express-async-handler";
import ReturnRequestModel from "../models/ReturnModel.js";

const getAllReturnRequest = expressAsyncHandler(async (req, res) => {
  const data = await ReturnRequestModel.find({});

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No return request found!" });
  }

  res.status(200).json(data);
});

export { getAllReturnRequest };
