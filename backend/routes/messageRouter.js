import express from "express";
import {
  getAll,
  create,
  updateMessage,
  deleteMessage,
  getSpecificMessage,
  sendMessage,
  getMessagesByChatId,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/Auth.js";
const messageRouter = express.Router();

messageRouter.get("/", getAll);
messageRouter.post("/create", create);
messageRouter.put("/update/:id", updateMessage);
messageRouter.get("/getId/:id", getSpecificMessage);
messageRouter.post("/delete/:id", deleteMessage);
messageRouter.post("/sendMessage", authMiddleware, sendMessage);
messageRouter.get("/messages/:chatId", getMessagesByChatId);
export default messageRouter;
