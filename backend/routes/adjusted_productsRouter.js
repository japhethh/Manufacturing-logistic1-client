import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import {
  getAllAdjustedProducts,
  createAdjustedProducts,
  getSpecificAdjustment,
  updateAdjustedProducts,
  deleteAdjustedProducts,
} from "../controllers/adjusted_productsController.js";
const adjusted_productsRouter = express.Router();

adjusted_productsRouter.get("/", authMiddleware, getAllAdjustedProducts);

adjusted_productsRouter.post("/create", authMiddleware, createAdjustedProducts);

adjusted_productsRouter.get("/getSpecificId/:id", authMiddleware, getSpecificAdjustment);

adjusted_productsRouter.put("/update/:id", authMiddleware, updateAdjustedProducts);

adjusted_productsRouter.delete("/delete/:id", authMiddleware, deleteAdjustedProducts);

export default adjusted_productsRouter;
