import express from "express";
import {
  // getAllBidding,
  // createdBidding,
  // getSpecificId,
  // deleteBidding,
  // updateBidding,
  getAllCategoryBiddings,
  createCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
} from "../controllers/biddingController.js";
import { authMiddleware } from "../middleware/Auth.js";
const biddingRouter = express.Router();

// biddingRouter.get("/", getAllBidding);
// biddingRouter.post("/", authMiddleware, createdBidding);
// biddingRouter.get("/:id", authMiddleware, getSpecificId);
// biddingRouter.delete("/:id", authMiddleware, deleteBidding);
// biddingRouter.put("/:id", authMiddleware, updateBidding);

// Category
biddingRouter.get("/category", authMiddleware, getAllCategoryBiddings);
biddingRouter.post("/category", authMiddleware, createCategoryBidding);
biddingRouter.put("/category/:id", authMiddleware, updateCategoryBidding);
biddingRouter.delete("/category/:id", authMiddleware, deleteCategoryBidding);
export default biddingRouter;
