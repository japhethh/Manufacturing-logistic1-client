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
import { protectMid } from "../middleware/Auth.js";
const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/request", requested);
rawmaterialRouter.get("/request/:id", getSpecificId);
rawmaterialRouter.post("/delete/:id", deleteRequest);
rawmaterialRouter.put("/updateStatus/:id", updateStatus);
rawmaterialRouter.post("/request", newRequested);
rawmaterialRouter.put(
  "/approveStatus/:id",
  protectMid,
  approvePurchaseRequisition
);
rawmaterialRouter.put(
  "/rejectStatus/:id",
  protectMid,
  rejectPurchaseRequisition
);

export default rawmaterialRouter;
