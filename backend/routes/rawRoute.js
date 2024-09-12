import express from "express";
import { newRequested, requested } from "../controllers/rawmaterialController";

const rawmaterialRouter = express.Router();

rawmaterialRouter.get("/requests", requested);
rawmaterialRouter.post("/request", newRequested);

export default rawmaterialRouter;