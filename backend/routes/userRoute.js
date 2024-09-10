import express from 'express';
import { getUser,registerUser,loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/getAllUsers",getUser);
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;
