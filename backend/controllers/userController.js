import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import generalSettingsModel from "../models/generalSettingsModel.js";
import { encryptArray } from "../testing/cryptoTesting.js";
import { useState } from "react";
import axios from "axios";
// Register
const registerUser = async (req, res) => {
  const { name, email, userName, password, phone, role, address, city } =
    req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res
      .status(400)
      .json({ success: false, message: "Existing Account!" });
  }

  const generalAccount = await generalSettingsModel.find({});
  const index1 = generalAccount[0];
  const newUser = new User({
    name: name,
    email: email,
    userName: userName,
    password: password,
    role: role,
    phone: phone,
    address: address,
    city: city,
    generalSetting: index1._id,
  });

  const getUser = await newUser.save();

  const user = await User.findById(getUser);

  res.status(201).json({ success: true, data: user });
};

const adminRequest = async (req, res) => {
  const { name, email, phone, address, city } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .json({ success: false, message: "Existing Account!" });
  }

  const newUser = new User({
    name: name,
    email: email,
    phone: phone,
    address: address,
    city: city,
  });

  const getUser = await newUser.save();
  const user = await User.findById(getUser._id);

  res.status(201).json({ success: true, data: user });
};

// Get All users
const getUser = async (req, res) => {
  try {
    const users = await User.find().populate("generalSetting");
    if (!users) {
      return res.status(400).json("Errors");
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error");
    throw new Error(error.message);
  }
};
// Specific id userdata
const getSpecificUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json(user);
});

// Get edit Update
const getEdit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User Not found" });
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(req.body);
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  let image = user.image;

  if (req.file) {
    try {
      // Delete the old image from Cloudinary if it exists
      if (user.image) {
        const public_id = user.image.split("/").pop().split(".")[0]; // Extract public_id from the URL
        await cloudinary.uploader.destroy(`JJM_USER_PROFILE/${public_id}`); // Adjust path if needed
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "JJM_USER_PROFILE",
      });

      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      image = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed", error });
    }
  }

  if (updatedData.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.password = await bcrypt.hash(updatedData.password, salt);
  }

  if (image) {
    updatedData.image = image;
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const io = req.app.get("socketio");

  io.to(updatedUser._id.toString()).emit("update-profile", updatedUser);

  res.status(200).json({ success: true, message: "Update Successfully" });
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPass, pass, confirmPass } = req.body;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Check if current password matches the user's stored password
  const isMatch = await bcrypt.compare(currentPass, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Current password is incorrect" });
  }

  // Check if the new password matches the confirm password
  if (pass !== confirmPass) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  // Update the user's password
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

const getSearch = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { role: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req._id } });
  res.status(200).json(users);
});

// Delete User using POST with Params
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the user ID from the URL params

  const user = await userModel.findByIdAndDelete(id); // Find the user by ID
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ success: true, token: createToken(user._id) });
  } else {
    res.status(404).json({ success: false, msg: "Invalid Email or Password" });
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Testing
const testingGetAllUsersEncrypt = asyncHandler(async (req, res) => {
  const users = await userModel.find({});

  if (!users) {
    return res.status(400).json({ success: false, message: "No users found!" });
  }

  const encrypted = users.map((user) => encryptArray(user));

  res.status(200).json(encrypted || []);
});

const testingLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const logistic1 =
    "https://manufacturing-logistic1-client-api.onrender.com/api/user/login";
  const logistic2 = "https://logistic2.jjm-manufacturing.com/login";

  try {
    const response = await axios.post(logistic1, { email, password });

    return res.status(200).json({
      msg: "Login successful with Logistic 1",
      token: response.data.token,
      portal: "Logistic 1",
      redirectUrl:
        "https://manufacturing-logistic1-client-frontend.onrender.com/",
    });
  } catch (error) {
    console.log("Logistic 1 failed:", error.response?.data?.msg);
  }

  try {
    const response = await axios.post(logistic2, { email, password });

    return res.status(200).json({
      msg: "Login successful with Logistic 2",
      token: response.data.token,
      portal: "Logistic 2",
      redirectUrl: "https://logistic2.jjm-manufacturing.com/MainUser",
    });
  } catch (error) {
    console.log("Logistic 1 failed:", error.response?.data?.msg);
  }

  // If both fail
  return res.status(401).json({ msg: "Invalid credentials for both systems." });
});

export {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
  deleteUser,
  getEdit,
  updateUser,
  adminRequest,
  getSearch,
  updateUserPassword,
  testingGetAllUsersEncrypt,
  testingLogin,
};
