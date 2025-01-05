import expressAsyncHandler from "express-async-handler";
import userModel from "../../models/userModel.js";

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await userModel.find({});

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  res.status(200).json(users);
});

export { getAllUsers };
