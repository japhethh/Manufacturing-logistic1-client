import VendorProfile from "../models/vendorProfileModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { contactPerson, email, profileImage } = req.body;
    const vendor = await VendorProfile.findByIdAndUpdate(
      req.params.id,
      {
        contactPerson,
        email,
        profileImage,
      },
      { new: true }
    );
    res.json({ vendor, message: "Profile updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const vendor = await VendorProfile.findById(req.params.id);

    // Check if current password matches
    const match = await bcrypt.compare(currentPassword, vendor.password);
    if (!match)
      return res.status(400).json({ error: "Current password is incorrect" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    vendor.password = hashedPassword;
    await vendor.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the password" });
  }
};

// Get Vendor Profile
export const getVendorProfile = async (req, res) => {
  try {
    const vendor = await VendorProfile.findById(req.params.id);
    res.json(vendor);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};
