import express from "express";
import {
  getChatWithParticipants,
  allChats,
  accessChat,
  getUserChats,
  accessChatSupplier,
} from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/Auth.js";
const chatRouter = express.Router();

chatRouter.get("/getSpecificChat/:chatId", getChatWithParticipants);
chatRouter.get("/getAllChats", allChats);
chatRouter.post("/accessChat", authMiddleware, accessChat);
chatRouter.post("/accessChatSupplier", authMiddleware, accessChatSupplier);
chatRouter.get("/getUserChats", authMiddleware, getUserChats);
export default chatRouter;
