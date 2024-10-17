import express from "express";
import multer from "multer";
import {
  getAllMaterial,
  createMaterial,
  appendMaterial,
  deleteMaterial,
  updateMaterial,
} from "../controllers/materialController.js";
import { authMiddleware } from "../middleware/Auth.js";

const materialRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

materialRouter.get("/getAllMaterial", authMiddleware, getAllMaterial);
materialRouter.post("/addMaterial", authMiddleware, createMaterial);
materialRouter.put(
  "/appendMaterial",
  upload.single("image"),
  authMiddleware,
  appendMaterial
);
materialRouter.put("/updateMaterial/:id", authMiddleware, updateMaterial);
materialRouter.delete("/deleteMaterial/:id", deleteMaterial);

export default materialRouter;
