import express from "express";
import multer from "multer";
import {
  getAllMaterial,
  createMaterial,
  appendMaterial,
  deleteMaterial,
  updateMaterial,
  getAllMaterialNoToken,
  getSpecificMaterial,
} from "../controllers/materialController.js";
import { authMiddleware } from "../middleware/Auth.js";
import { productCount } from "../aggregation/productsAggregation.js";

const materialRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

materialRouter.get("/getAllMaterial", authMiddleware, getAllMaterial);
materialRouter.get(
  "/getSpecificMaterial/:id",
  authMiddleware,
  getSpecificMaterial
);
materialRouter.get("/getAllMaterialNoToken", getAllMaterialNoToken);
materialRouter.post("/addMaterial", authMiddleware, createMaterial);
materialRouter.put(
  "/appendMaterial",
  upload.single("image"),
  authMiddleware,
  appendMaterial
);
materialRouter.put(
  "/updateMaterial/:id",
  upload.single("image"),
  authMiddleware,
  updateMaterial
);

materialRouter.delete("/deleteMaterial/:id", authMiddleware, deleteMaterial);
materialRouter.get("/productCount", productCount);
export default materialRouter;
