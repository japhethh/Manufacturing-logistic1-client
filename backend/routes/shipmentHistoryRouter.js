import { deleteShipmentHistory, getAllShipmentHistory } from "../controllers/shipmentHistoryController.js";

import express from "express";

const shipmentHistoryRouter = express.Router();

shipmentHistoryRouter.get("/getAllShipmentHistory", getAllShipmentHistory);
shipmentHistoryRouter.delete("/deleteShipmentHistory/:id", deleteShipmentHistory);

export default shipmentHistoryRouter;
