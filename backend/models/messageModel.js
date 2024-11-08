import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    sendingType: { type: String, enum: ["User", "Supplier"] },
    sending: { type: mongoose.Schema.Types.ObjectId, refPath: "sendingType" },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
