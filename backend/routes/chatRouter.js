import express from "express";
import {
  createChat,
  getChatWithParticipants,
  allChats,
} from "../controllers/chatController.js";
const chatRouter = express.Router();

chatRouter.get("/getSpecificChat/:chatId", getChatWithParticipants);
chatRouter.post("/create", createChat);
chatRouter.get("/getAllChats", allChats);

export default chatRouter;
