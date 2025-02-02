import express from "express";
import {
  updateProfile,
  updatePassword,
  getVendorProfile,
} from "../controllers/vendorProfileController.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

// Get Vendor Profile
router.get("/:id", verifyToken, getVendorProfile);

// Update Profile
router.put("/:id", verifyToken, updateProfile);

// Update Password
router.put("/:id/password", verifyToken, updatePassword);

export default router;
