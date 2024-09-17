import { IoEarSharp } from "react-icons/io5";
import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Register
const registerUser = async (req, res) => {
  const { name, email, password, phone, role, address, city } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res
      .status(400)
      .json({ success: false, message: "Existing Account!" });
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role: role,
    phone: phone,
    address: address,
    city: city,
  });

  const getUser = await newUser.save();

  const user = await User.findById(getUser);

  res.status(201).json({ success: true, data: user });
};

// Get All users
const getUser = async (req, res) => {
  try {
    const users = await User.find({});
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

// Update the user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, password, role, address, city } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Update user Details
  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.email = email || user.email;

  // 👽Back and fix this soon jap👽
  user.password = password || user.password;
  user.role = role || user.role;
  user.address = address || user.address;
  user.city = city || user.city;

  const updatedUser = await user.save();

  // Return the updated user data;
  res.status(200).json({ success: true, data: updatedUser });
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
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
  deleteUser,
  getEdit,
  updateUser,
};
