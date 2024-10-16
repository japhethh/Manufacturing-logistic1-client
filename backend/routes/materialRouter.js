import express from "express";
import {
  getAllMaterial,
  createMaterial,
  appendMaterial,
  deleteMaterial,
  updateMaterial,
} from "../controllers/materialController.js";
import { authMiddleware } from "../middleware/Auth.js";

const materialRouter = express.Router();

materialRouter.get("/getAllMaterial", getAllMaterial);
materialRouter.post("/addMaterial", createMaterial);
materialRouter.put("/appendMaterial/:id", appendMaterial);
materialRouter.put("/updateMaterial/:id", updateMaterial);
materialRouter.delete("/deleteMaterial/:id", deleteMaterial);

export default materialRouter;
