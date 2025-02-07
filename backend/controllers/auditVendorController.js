import expressAsyncHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";
import AuditSupplierLog from "../models/auditSupplierModel.js";

const getAllAuditLogLogistic = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const existUser = await supplierModel.findById(userId);
  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: "User Id not found!" });
  }

  const auditLog = await AuditSupplierLog.find({});
  if (!auditLog) {
    return res
      .status(404)
      .json({ success: false, message: "Audit Log not found!" });
  }

  res.status(200).json(auditLog);
});

export { getAllAuditLogLogistic };
