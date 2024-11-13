import express from "express";
import {
  getChatWithParticipants,
  allChats,
  accessChat,
  getUserChats,
  accessChatSupplier,
  getChatWithMessages,
} from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/Auth.js";
const chatRouter = express.Router();

chatRouter.get("/getSpecificChat/:chatId", getChatWithParticipants);
chatRouter.get("/getAllChats", allChats);
chatRouter.post("/accessChat", authMiddleware, accessChat);
chatRouter.post("/accessChatSupplier", authMiddleware, accessChatSupplier);
chatRouter.get("/getUserChats", authMiddleware, getUserChats);
chatRouter.get("/getChatWithMessages/:chatId", authMiddleware, getChatWithMessages);
export default chatRouter;
