import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import { getAllNotification } from "../controllers/notificationVendorController.js";

const notificationVendorRouter = express.Router();

notificationVendorRouter.get(
  "/",
  authMiddleware,
  getAllNotification
);

export default notificationVendorRouter;
