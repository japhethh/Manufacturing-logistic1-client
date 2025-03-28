import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import axios from "axios";
import {
  getAllAuditLogLogistic,
  deleteAuditLogLogistic,
} from "../controllers/auditLogisticController.js";
import expressAsyncHandler from "express-async-handler";

const auditLogisticRouter = express.Router();

auditLogisticRouter.get("/", authMiddleware, getAllAuditLogLogistic);
auditLogisticRouter.delete("/", authMiddleware, deleteAuditLogLogistic);
auditLogisticRouter.get(
  "/core2-audit",
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await axios.get(
        "https://backend-core2.jjm-manufacturing.com/api/auditCompletedTasksLogistic1"
      );

      res.status(200).json(data.data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data!" });
    }
  })
);

export default auditLogisticRouter;
