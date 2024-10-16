import express from "express";
import {
  getAllCategory,
  createCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryVendorController.js";
const categoryVendorRouter = express.Router();

categoryVendorRouter.get("/", getAllCategory);
categoryVendorRouter.post("/createCategory", createCategory);
categoryVendorRouter.get("/getSpecificCategory/:id", getSpecificCategory);
categoryVendorRouter.delete("/deleteCategory/:id", deleteCategory);
categoryVendorRouter.put("/updateCategory/:id", updateCategory);

export default categoryVendorRouter;
