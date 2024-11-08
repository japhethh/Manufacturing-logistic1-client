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
const updateMessage = asyncHandler(async (req, res) => {});

// Delete
const deleteMessage = asyncHandler(async (req, res) => {
  // const {userId} = req.body;
});

export { create, getAll, getSpecificMessage, updateMessage, deleteMessage };
