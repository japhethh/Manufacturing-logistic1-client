import express from "express";
import { getAllTrackingOrders } from "../controllers/trackingOrdersController.js";
const trackingOrdersRouter = express.Router();

trackingOrdersRouter.get("/", getAllTrackingOrders);

export default trackingOrdersRouter;
