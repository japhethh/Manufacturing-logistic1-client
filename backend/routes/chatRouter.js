import express from "express";
import {
  getChatWithParticipants,
  allChats,
  accessChat,
  getUserChats,
} from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/Auth.js";
const chatRouter = express.Router();

chatRouter.get("/getSpecificChat/:chatId", getChatWithParticipants);
chatRouter.get("/getAllChats", allChats);
chatRouter.post("/accessChat", authMiddleware, accessChat);
chatRouter.get("/getUserChats", authMiddleware, getUserChats);
export default chatRouter;
