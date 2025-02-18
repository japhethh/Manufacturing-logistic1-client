import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllAuditLogLogistic,
  deleteAuditLogLogistic,
} from "../controllers/auditLogisticController.js";

const auditLogisticRouter = express.Router();

auditLogisticRouter.get("/", authMiddleware, getAllAuditLogLogistic);
auditLogisticRouter.delete("/", authMiddleware, deleteAuditLogLogistic);

export default auditLogisticRouter;
