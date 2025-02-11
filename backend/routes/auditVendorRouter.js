import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import { getAllAuditLogLogistic } from "../controllers/auditVendorController.js";
const auditVendorRouter = express.Router();

auditVendorRouter.get("/", authMiddleware, getAllAuditLogLogistic);

export default auditVendorRouter;
