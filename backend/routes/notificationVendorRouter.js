import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllNotification,
  updateMarkAsRead,
} from "../controllers/notificationVendorController.js";

const notificationVendorRouter = express.Router();

notificationVendorRouter.get("/", authMiddleware, getAllNotification);

notificationVendorRouter.put("/updateMarkAsRead/:id", updateMarkAsRead);

export default notificationVendorRouter;
