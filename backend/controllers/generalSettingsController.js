import generalSettingsModel from "../models/generalSettingsModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
// Create
const createGeneralSettings = asyncHandler(async (req, res) => {
  const {
    companyName,
    companyEmail,
    companyPhone,
    defaultCurrency,
    defaultCurrencyPosition,
    notificationEmail,
    companyAddress,
    logo,
  } = req.body;

  const createnow = new generalSettingsModel({
    companyName,
    companyEmail,
    companyPhone,
    defaultCurrency,
    defaultCurrencyPosition,
    notificationEmail,
    companyAddress,
    logo,
  });

  await createnow.save();

  res.status(200).json({ success: true, message: "Created Successfully" });
});

// Read
const getAllGeneralSettings = asyncHandler(async (req, res) => {
  const gatherdata = await generalSettingsModel.find();

  if (!gatherdata) {
    return res.status(400).json({ success: false, message: "Info Not Found!" });
  }

  res.status(200).json({ success: true, data: gatherdata });
});

// Update
// Update General Settings
const updateGeneralSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedFields = { ...updateData }; // Copy all body fields for update

  // Check if a file is uploaded
  if (req.file) {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images", // You can change the folder name
      });

      // Optionally delete the local file if stored locally
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      // Add the Cloudinary URL to the updated fields
      updatedFields.logo = result.secure_url;
    } catch (error) {
      return res.status(500).json({ success: false, message: "Image upload failed", error });
    }
  }

  // Update the General Settings in the database
  const data = await generalSettingsModel.findByIdAndUpdate(id, updatedFields, {
    new: true, // Return the updated document
  });

  if (!data) {
    return res.status(400).json({ success: false, message: "General Settings Not Found!" });
  }

  res.status(200).json({ success: true, data: data, message: "Update Successfully!" });
});

// Delete
const deleteGeneralSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await generalSettingsModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

const getSpecificId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const fetchData = await generalSettingsModel.findById(id);
  if (!fetchData) {
    return res
      .status(400)
      .json({ success: false, message: "General Settings Not Found!" });
  }

  res.status(200).json({ success: true, data: fetchData });
});

export {
  getAllGeneralSettings,
  createGeneralSettings,
  updateGeneralSettings,
  deleteGeneralSettings,
  getSpecificId,
};
