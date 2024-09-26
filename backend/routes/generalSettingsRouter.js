import express from "express";
import {authMiddleware} from "../middleware/Auth.js";
import multer from "multer";

import {
  createGeneralSettings,
  getAllGeneralSettings,
  updateGeneralSettings,
  deleteGeneralSettings,
  getSpecificId,
} from "../controllers/generalSettingsController.js";

const generalSettingsRouter = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

generalSettingsRouter.get(
  "/getAllGeneralSettings",
  authMiddleware,
  getAllGeneralSettings
);
generalSettingsRouter.post("/create", createGeneralSettings);
generalSettingsRouter.put(
  "/update/:id",
  upload.single("logo"),
  updateGeneralSettings
);
generalSettingsRouter.delete("/delete/:id", deleteGeneralSettings);
generalSettingsRouter.get("/getSpecificId/:id", authMiddleware, getSpecificId);

export default generalSettingsRouter;
// 66f1ef49f50be7fc60baedb3
