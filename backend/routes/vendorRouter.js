import express from "express";

import { getUserData } from "../controllers/vendorController.js";
import { authMiddleware } from "../middleware/Auth.js";

const vendorRouter = express.Router();

vendorRouter.get("/", authMiddleware, getUserData);

export default vendorRouter;
