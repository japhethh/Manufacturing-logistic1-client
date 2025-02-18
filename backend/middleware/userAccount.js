import axios from "axios";
import "dotenv/config";
import generateServiceToken from "./gatewayGenerator.js";
import expressAsyncHandler from "express-async-handler";

export const userAccount = expressAsyncHandler(async (req, res) => {
  const serviceToken = generateServiceToken(); 

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  return response.data;
});
