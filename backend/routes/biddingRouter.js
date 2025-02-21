import express from "express";
import multer from "multer";
import {
  getAllBidding,
  createdBidding,
  // getSpecificId,
  // deleteBidding,
  // updateBidding,
  getAllCategoryBiddings,
  createCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
  deleteBidding
} from "../controllers/biddingController.js";
import { authMiddleware } from "../middleware/Auth.js";
const biddingRouter = express.Router();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

biddingRouter.get("/", authMiddleware, getAllBidding);
biddingRouter.post(
  "/",
  upload.single("productImage"),
  authMiddleware,
  createdBidding
);
// biddingRouter.get("/:id", authMiddleware, getSpecificId);
biddingRouter.delete("/:id", authMiddleware, deleteBidding);
// biddingRouter.put("/:id", authMiddleware, updateBidding);

// Category
biddingRouter.get("/category", authMiddleware, getAllCategoryBiddings);
biddingRouter.post("/category", authMiddleware, createCategoryBidding);
biddingRouter.put("/category/:id", authMiddleware, updateCategoryBidding);
biddingRouter.delete("/category/:id", authMiddleware, deleteCategoryBidding);
export default biddingRouter;
