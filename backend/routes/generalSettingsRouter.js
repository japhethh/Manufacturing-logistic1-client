import express from "express";
import {
  createGeneralSettings,
  getAllGeneralSettings,
  updateGeneralSettings,
  deleteGeneralSettings,
} from "../controllers/generalSettingsController.js";

const generalSettingsRouter = express.Router();

generalSettingsRouter.get("/getAllGeneralSettings", getAllGeneralSettings);
generalSettingsRouter.post("/create", createGeneralSettings);
generalSettingsRouter.put("/update/:id", updateGeneralSettings);
generalSettingsRouter.delete("/delete/:id", deleteGeneralSettings);

export default generalSettingsRouter;
