import express from "express";

import {
  createShipment,
  getAllShipment,
  updateShipment,
  deleteShipment,
} from "../controllers/shipmentController.js";

const shipmentRouter = express.Router();

shipmentRouter.get("/getAllShipment", getAllShipment);
shipmentRouter.post("/createShipment", createShipment);
shipmentRouter.put("/updateShipment/:id/status", updateShipment);
shipmentRouter.delete("/deleteShipment/:id", deleteShipment);

export default shipmentRouter;
