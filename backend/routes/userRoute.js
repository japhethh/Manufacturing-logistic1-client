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
  getSearch,
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.get("/", authMiddleware, getSpecificUser);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update/:id", updateUser);
userRouter.post("/delete/:id", deleteUser);
userRouter.post("/adminrequest", adminRequest);
userRouter.get("/getAllUsers", getUser);
userRouter.get("/getEdit/:id", getEdit);
userRouter.get("/userSearch", getSearch);

export default userRouter;
