import express from "express";
import {
  newRequested,
  requested,
  getSpecificId,
  deleteRequest,
  updateStatus,
  approvePurchaseRequisition,
  rejectPurchaseRequisition,
} from "../controllers/rawmaterialController.js";
import { authMiddleware, protectMid } from "../middleware/Auth.js";
const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/request", requested);
rawmaterialRouter.get("/request/:id", getSpecificId);
rawmaterialRouter.post("/delete/:id", deleteRequest);
rawmaterialRouter.put("/updateStatus/:id", updateStatus);
rawmaterialRouter.post("/request", newRequested);
rawmaterialRouter.put(
  "/approveStatus/:id",
  authMiddleware,
  approvePurchaseRequisition
);
rawmaterialRouter.put(
  "/rejectStatus/:id",
  authMiddleware,
  rejectPurchaseRequisition
);

export default rawmaterialRouter;
