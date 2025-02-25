import generateServiceToken from "../middleware/gatewayGenerator.js";
import inventoryModel from "../models/inventoryLogisticModel.js";
// import Inventory from "../models/inventoryLogisticModel.js";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
const getAllInventory = expressAsyncHandler(async (req, res) => {
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

  const data = await inventoryModel.find({});
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "Inventory not found!" });
  }

  res.status(200).json(data);
});

export { getAllInventory };
