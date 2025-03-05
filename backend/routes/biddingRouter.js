import express from "express";
import multer from "multer";
import {
  getAllBidding,
  createdBidding,
  deleteBidding,
  getAllCategoryBiddings,
  createCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
  updateBidding,
  selectBiddingWinner,
  getAllOpenBidding,
} from "../controllers/biddingController.js";
import { authMiddleware } from "../middleware/Auth.js";

const biddingRouter = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Allow unauthenticated access to fetch bidding data
biddingRouter.get("/", getAllBidding);
biddingRouter.get("/getOpenBidding", getAllOpenBidding);

// Allow unauthenticated access to fetch categories
biddingRouter.get("/category", getAllCategoryBiddings); // Removed authMiddleware

// Routes that require authentication
biddingRouter.post(
  "/",
  upload.single("productImage"),
  authMiddleware,
  createdBidding
);
biddingRouter.post("/delete/:id", authMiddleware, deleteBidding);

// Category routes (require authentication)
biddingRouter.post("/category", authMiddleware, createCategoryBidding);
biddingRouter.put("/category/:id", authMiddleware, updateCategoryBidding);
biddingRouter.delete("/category/:id", authMiddleware, deleteCategoryBidding);

biddingRouter.put("/bidding-product/:id", authMiddleware, updateBidding);
biddingRouter.post(
  "/bidding-selectBiddingWinner",
  authMiddleware,
  selectBiddingWinner
);

export default biddingRouter;
