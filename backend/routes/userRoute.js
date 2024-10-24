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
  updateUserPassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/Auth.js";
import multer from "multer";
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

userRouter.get("/", authMiddleware, getSpecificUser);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update/:id", upload.single("image"),authMiddleware, updateUser);
userRouter.post("/delete/:id", deleteUser);
userRouter.post("/adminrequest", adminRequest);
userRouter.get("/getAllUsers", getUser);
userRouter.get("/getEdit/:id", getEdit);
userRouter.get("/userSearch", getSearch);
userRouter.put("/updatePassword/:id", updateUserPassword);

export default userRouter;
