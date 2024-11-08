import asyncHandler from "express-async-handler";
import chatModel from "../models/chatsModel.js";

// Create
const createChat = asyncHandler(async (req, res) => {
  const { participants, title } = req.body;

  // Validate the request body
  if (
    !participants ||
    !Array.isArray(participants) ||
    participants.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Participants are required to create a chat." });
  }

  const chat = await chatModel.create({ title, participants });

  await chat.save();

  res.status(201).json({ success: true, data: chat });
});

// Get All
const getChatWithParticipants = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await chatModel.findById(chatId).populate({
      path: "participants.participantId",
      select: "name email",
    });

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found!" });
    }

    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat.", error });
  }
});

// Get Specific
const allChats = asyncHandler(async (req, res) => {
  const getAll = await chatModel.find({});

  if (!getAll) {
    return res.status(404).json({ success: false, message: "Chat not found." });
  }

  res.status(200).json(getAll);
});

export { createChat, allChats, getChatWithParticipants };
