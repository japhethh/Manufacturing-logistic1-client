import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
  deleteUser,
  getEdit,
  updateUser,
  adminRequest,
} from "../controllers/userController.js";
import Auth from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.get("/getAllUsers", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", Auth, getSpecificUser);
userRouter.get("/getEdit/:id", getEdit);
userRouter.put("/update/:id", updateUser);
userRouter.post("/delete/:id", deleteUser);
userRouter.post("/adminrequest",adminRequest);

export default userRouter;
