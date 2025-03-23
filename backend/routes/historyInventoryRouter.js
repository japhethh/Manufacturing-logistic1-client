import express from "express";
import { historyInventoryGet } from "../controllers/inventoryHistoryController.js";

const historyInventoryRouter = express.Router();

historyInventoryRouter.get("/", historyInventoryGet);

export default historyInventoryRouter;
