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
biddingRouter.get("/", getAllBidding); // Removed authMiddleware

// Allow unauthenticated access to fetch categories
biddingRouter.get("/category", getAllCategoryBiddings); // Removed authMiddleware

// Routes that require authentication
biddingRouter.post(
  "/",
  upload.single("productImage"),
  authMiddleware,
  createdBidding
);
biddingRouter.delete("/:id", authMiddleware, deleteBidding);

// Category routes (require authentication)
biddingRouter.post("/category", authMiddleware, createCategoryBidding);
biddingRouter.put("/category/:id", authMiddleware, updateCategoryBidding);
biddingRouter.delete("/category/:id", authMiddleware, deleteCategoryBidding);

export default biddingRouter;