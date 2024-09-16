import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
} from "../controllers/userController.js";
import Auth from "../middleware/Auth.js";
import axios from "axios";
const userRouter = express.Router();

userRouter.get("/getAllUsers", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", Auth, getSpecificUser);

export default userRouter;
