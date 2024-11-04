import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  sending:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  content:{type:String, trim:true},
  chat:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"}  
})


const messageModel = mongoose.model("Message",messageSchema);

export default messageModel;