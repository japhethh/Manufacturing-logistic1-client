import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import { getAllAuditLogLogistic } from "../controllers/auditLogisticController.js";

const auditLogisticRouter = express.Router();

auditLogisticRouter.get("/", authMiddleware, getAllAuditLogLogistic);

export default auditLogisticRouter;
