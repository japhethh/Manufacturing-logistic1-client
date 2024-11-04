import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  latestMessage:{type:mongoose.Schema.Types.ObjectId, ref:"Message"},
  users:[{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],

},{timestamps:true});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;