import expressAsyncHandler from "express-async-handler";
import AuditLog from "../models/auditLogisiticModel.js";
import userModel from "../models/userModel.js";

const getAllAuditLogLogistic = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const existUser = await userModel.findById(userId);
  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: "User Id not found!" });
  }

  const auditLog = await AuditLog.find({});
  if (!auditLog) {
    return res
      .status(404)
      .json({ success: false, message: "Audit Log not found!" });
  }

  res.status(200).json(auditLog);
});

export { getAllAuditLogLogistic };
