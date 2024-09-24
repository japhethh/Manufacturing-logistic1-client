import generalSettingsModel from "../models/generalSettingsModel.js";
import asyncHandler from "express-async-handler";

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
const updateGeneralSettings = asyncHandler(async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;

  const data = await generalSettingsModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "General Settings Not Found!" });
  }

  res
    .status(200)
    .json({ success: true, data: data, message: "Update Successfully!" });
});

// Delete
const deleteGeneralSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await generalSettingsModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

export {
  getAllGeneralSettings,
  createGeneralSettings,
  updateGeneralSettings,
  deleteGeneralSettings,
};
