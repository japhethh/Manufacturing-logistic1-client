import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  getSpecificUser,
  getSpecificUsers,
  deleteUser,
  getEdit,
  updateUser,
  adminRequest,
  getSearch,
  updateUserPassword,
  testingGetAllUsersEncrypt,
  testingLogin,
  getAccountRequest,
} from "../controllers/userController.js";
import { authMiddleware, authorize, protectMid } from "../middleware/Auth.js";

import multer from "multer";
import { getAllUsers } from "../controllers/testing/userTesting.js";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

userRouter.get("/", authMiddleware, getSpecificUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put(
  "/update/:id",
  upload.single("image"),
  authMiddleware,
  updateUser
);
userRouter.post("/delete/:id", deleteUser);
userRouter.post("/adminrequest", adminRequest);
userRouter.get("/getAllUsers", getUser);
userRouter.get("/getEdit/:id", getEdit);
userRouter.get("/userSearch", getSearch);
userRouter.put("/updatePassword/:id", updateUserPassword);
userRouter.get("/testingGetAllUsersEncrypt", testingGetAllUsersEncrypt);
userRouter.post("/loginMicroservices", testingLogin);

userRouter.get(
  "/testingMiddleware",
  protectMid,
  authorize("admin"),
  getAllUsers
);

userRouter.get("/requesting-account", getAccountRequest);

userRouter.post(
  "/logins",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const serviceToken = generateServiceToken();

    const response = await axios.get(
      `${process.env.API_GATEWAY_URL}/admin/get-accounts`,

      {
        headers: { Authorization: `Bearer ${serviceToken}` },
      }
    );

    const accountData = response.data;

    return accountData;
  })
);

export default userRouter;
