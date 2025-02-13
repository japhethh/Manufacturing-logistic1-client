import express from "express";
import {
  getAllBidding,
  createdBidding,
  getSpecificId,
  deletedBidding,
  updateBidding,
} from "../controllers/biddingController.js";
import { authMiddleware } from "../middleware/Auth.js";
const biddingRouter = express.Router();

biddingRouter.get("/", getAllBidding);
biddingRouter.post("/", authMiddleware, createdBidding);
biddingRouter.get("/:id", authMiddleware, getSpecificId);
biddingRouter.delete("/:id", authMiddleware, deletedBidding);
biddingRouter.put("/:id", authMiddleware, updateBidding);
export default biddingRouter;
