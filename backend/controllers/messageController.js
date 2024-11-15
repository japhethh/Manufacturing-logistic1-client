import chatModel from "../models/chatsModel.js";
import messageModel from "../models/messageModel.js";
import asyncHandler from "express-async-handler";

// Create
const create = asyncHandler(async (req, res) => {
  const { content, chatId, sendingType, sendingId } = req.body;

  if (!content || !chatId || !sendingType || !sendingId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const message = new messageModel({
      content,
      chat: chatId,
      sendingType,
      sending: sendingId,
    });

    await message.save();

    res.status(201).json({ success: true, message: " Created Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Message not found!" });
  }
});

// Get All
const getAll = asyncHandler(async (req, res) => {
  const messages = await messageModel.find({});
  if (!messages) {
    return res
      .status(400)
      .json({ success: false, message: "Message not found" });
  }

  res.status(200).json(messages);
});

// Get specific Id
const getSpecificMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const messageSpecific = await messageModel.findById(id);
  if (!messageSpecific) {
    return res
      .status(400)
      .json({ success: false, message: "Message not found" });
  }

  res.status(200).json({ success: true, data: messageSpecific });
});

// Update
const updateMessage = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const updatedMessage = await findByIdAndUpdate(userId);

  if (!updatedMessage) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "Updated Successfully" });
});

// Delete
const deleteMessage = asyncHandler(async (req, res) => {
  // const {userId} = req.body;
});

// Send Message
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, sendingType, userId } = req.body;

  console.log(req.body.content);
  console.log(req.body.chatId);
  console.log(req.body.sendingType);
  console.log(req.body.userId);
  if (!content || !chatId || !sendingType || !userId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  console.log(userId);

  const chat = await chatModel.findById(chatId);
  // console.log(chat);
  const isParticipant = chat.participants.some(
    (participant) =>
      participant.participantType === sendingType &&
      participant.participantId.toString() === userId.toString()
  );

  if (!isParticipant) {
    return res.status(403).json({
      message: "You are not authorized to send messages in this chat.",
    });
  }

  // Create and save the message
  const message = new messageModel({
    content,
    chat: chatId,
    sendingType,
    sending: userId,
  });

  await message.save();

  chat.messages.push(message._id);

  await chat.save();

  // Populate the sender's details for the response
  const fullMessage = await message.populate("sending", "name email");

  await chatModel.findByIdAndUpdate(
    chatId,
    {
      lastMessage: message.content,
    },
    { new: true }
  );

  res.status(201).json(fullMessage);
  // End
});

const getMessagesByChatId = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.params;

    // Check if the chat exists
    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    const message = await messageModel
      .find({ chat: chatId })
      // .populate("sending")
      // .populate("chat", "title")
      .sort({ createdAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export {
  create,
  getAll,
  getSpecificMessage,
  updateMessage,
  deleteMessage,
  sendMessage,
  getMessagesByChatId,
};
