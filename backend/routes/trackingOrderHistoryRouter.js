import express from "express";
import { getAllTrackingOrderHistory } from "../controllers/trackingOrderHistoryController.js";

const trackingOrderHistoryRouter = express.Router();

trackingOrderHistoryRouter.get("/", getAllTrackingOrderHistory);
// trackingOrderHistoryRouter.post("/delete", deleteTrackingOrderHistory);
export default trackingOrderHistoryRouter;
