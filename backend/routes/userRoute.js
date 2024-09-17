import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
  deleteUser,
} from "../controllers/userController.js";
import Auth from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.get("/getAllUsers", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", Auth, getSpecificUser);
userRouter.post("/delete/:id", deleteUser);

export default userRouter;
