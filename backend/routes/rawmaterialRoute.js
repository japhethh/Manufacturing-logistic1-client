import express from "express";
import { newRequested, requested } from "../controllers/rawmaterialController.js";

const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/request", requested);
rawmaterialRouter.post("/request", newRequested);

export default rawmaterialRouter;