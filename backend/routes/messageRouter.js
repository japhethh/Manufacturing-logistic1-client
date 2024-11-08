import express from "express";
import {
  getAll,
  create,
  updateMessage,
  deleteMessage,
  getSpecificMessage
} from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.get("/", getAll);
messageRouter.post("/create", create);
messageRouter.put("/update/:id", updateMessage);
messageRouter.get("/getId/:id", getSpecificMessage)
messageRouter.post("/delete/:id", deleteMessage);

export default messageRouter;
