import express from "express";
import {
  getAllCategory,
  createCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryVendorController.js";
import { authMiddleware } from "../middleware/Auth.js";
const categoryVendorRouter = express.Router();

categoryVendorRouter.get("/", authMiddleware, getAllCategory);
categoryVendorRouter.post("/createCategory", authMiddleware, createCategory);
categoryVendorRouter.get("/getSpecificCategory/:id", getSpecificCategory);
categoryVendorRouter.delete("/deleteCategory/:id", deleteCategory);
categoryVendorRouter.put("/updateCategory/:id", authMiddleware, updateCategory);

export default categoryVendorRouter;
