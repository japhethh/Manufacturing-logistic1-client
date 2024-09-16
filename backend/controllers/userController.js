import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    if(!users){
      return res.status(400).json("Errors")
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error");
    throw new Error(error.message);
  }
};

const getSpecificUser = asyncHandler(async(req,res) => {
  const {userId} = req.body;

  const user =  await User.findById(userId);
  if(!user){
    res.status(404).json({success:false, message:"User not found"});
  }

  res.status(200).json(user);
}) 

const registerUser = async (req, res) => {
  const { name, email, password,phone,role,address,city } = req.body;


  const exist = await User.findOne({email});


  if(exist){
  return res.status(400).json({success:false, message:"Existing Account!"})
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role:role,
    phone:phone,
    address:address,
    city:city
  });

  const getUser = await newUser.save();

  const user = await User.findById(getUser);

  res.status(201).json({ success: true, data: user });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({success:true,
      token: createToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { getUser, registerUser, loginUser,getSpecificUser };
