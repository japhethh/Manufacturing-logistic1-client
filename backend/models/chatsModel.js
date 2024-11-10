import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    title: { type: String, trim: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: String, trim: true },
    participants: [
      {
        participantType: {
          type: String,
          enum: ["User", "Supplier"],
          required: true,
        },
        participantId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "participants.participantType",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
// "title": "Chat about Orders",
