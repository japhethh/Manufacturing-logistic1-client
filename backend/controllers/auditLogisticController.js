import expressAsyncHandler from "express-async-handler";
import AuditLog from "../models/auditLogisiticModel.js";
import userModel from "../models/userModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";

const getAllAuditLogLogistic = expressAsyncHandler(async (req, res) => {
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
  console.log(userExist);

  // const existUser = await userModel.findById(userId);
  // if (!existUser) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "User Id not found!" });
  // }

  const auditLog = await AuditLog.find({});
  if (!auditLog) {
    return res
      .status(404)
      .json({ success: false, message: "Audit Log not found!" });
  }

  res.status(200).json(auditLog);
});

const deleteAuditLogLogistic = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await AuditLog.findByIdAndUpdate(id);

  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Audit id not found!" });
  }

  res.status(200).json({ success: false, message: "Deleted Successfully!" });
});

export { getAllAuditLogLogistic, deleteAuditLogLogistic };
