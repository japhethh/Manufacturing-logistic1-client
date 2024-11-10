import asyncHandler from "express-async-handler";
import chatModel from "../models/chatsModel.js";

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

// Access Chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId, supplierId } = req.body;

  console.log(userId);
  console.log(supplierId);

  if (!userId || !supplierId) {
    return res
      .status(400)
      .json({ message: "User id and Supplier ID are required" });
  }

  let chat = await chatModel.findOne({
    participants: {
      $elemMatch: {
        participantType: "User",
        participantId: userId,
      },
    },

    participants: {
      $elemMatch: {
        participantType: "Supplier",
        participantId: supplierId,
      },
    },
  });

  // If the chat exists, return it

  if (chat) {
    return res.status(200).json(chat);
  }

  chat = new chatModel({
    title: "User-Supplier Chat",
    participants: [
      { participantType: "User", participantId: userId },
      { participantType: "Supplier", participantId: supplierId },
    ],
  });

  await chat.save();

  // Populate the participants' details in the response
  const fullChat = await chat.populate({
    path: "participants.participantId",
    select: "name email",
  });

  res.status(201).json(fullChat);
});

const accessChatSupplier = asyncHandler(async (req, res) => {
  const { userId, otherId } = req.body;

  console.log(otherId);

  if (!userId || !otherId) {
    return res.status(400).json({
      success: false,
      message: "User id and Supplier are required!",
    });
  }

  let chat = await chatModel.findOne({
    participants: {
      $elemMatch: {
        participantType: "Supplier",
        participantId: userId,
      },
    },

    participants: {
      $elemMatch: {
        participantType: "User",
        participantId: otherId,
      },
    },
  });

  if (chat) {
    return res.status(200).json(chat);
  }

  // Gagawin ko to kasi ito yung gusto ko
  chat = new chatModel({
    title: "None",
    participants: [
      { participantType: "Supplier", participantId: userId },
      { participantType: "User", participantId: otherId },
    ],
  });

  await chat.save();

  // Populate the participants' details in the response
  const fullChat = await chat.populate({
    path: "participants.participantId",
    select: "name email",
  });

  res.status(201).json(fullChat);
});

const getUserChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User Id is required" });
  }

  // Find all chats where the user is a participant
  const chats = await chatModel
    .find({
      participants: {
        $elemMatch: { participantId: userId },
      },
    })
    .populate("participants.participantId");

  if (!chats || chats.length === 0) {
    return res.status(400).json({ success: false, message: "No chats found" });
  }
  res.status(200).json(chats);
});

export {
  allChats,
  getChatWithParticipants,
  accessChat,
  getUserChats,
  accessChatSupplier,
};
