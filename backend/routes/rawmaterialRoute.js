import express from "express";
import { newRequested, requested ,getSpecificId} from "../controllers/rawmaterialController.js";

const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/request", requested);
rawmaterialRouter.get("/request/:id", getSpecificId);
rawmaterialRouter.post("/request", newRequested);

export default rawmaterialRouter;