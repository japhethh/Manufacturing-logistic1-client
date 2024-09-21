import express from "express";
import {
  newRequested,
  requested,
  getSpecificId,
  deleteRequest,
} from "../controllers/rawmaterialController.js";
const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/request", requested);
rawmaterialRouter.get("/request/:id", getSpecificId);
rawmaterialRouter.post("/delete/:id", deleteRequest);
rawmaterialRouter.post("/request", newRequested);

export default rawmaterialRouter;
