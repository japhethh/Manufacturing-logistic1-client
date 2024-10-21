import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllNotification,
  updateMarkAsRead,
} from "../controllers/notificationLogisticController.js";

const notificationLogisticRouter = express.Router();

notificationLogisticRouter.get("/", authMiddleware, getAllNotification);

notificationLogisticRouter.put("/updateMarkAsRead/:id", updateMarkAsRead);

export default notificationLogisticRouter;
