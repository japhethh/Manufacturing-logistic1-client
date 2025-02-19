import mongoose from "mongoose";

const biddingSchema = new mongoose({
  name: { type: String },
  category: { type: String },
  description: { type: String },
  regularPrice: { type: Number },
  startBiddingPrice: { type: Number },
  biddingEndDate: { type: Date },
  productImage: { type: String },
});

const biddingModel = mongoose.model("bidding", biddingSchema);

export default biddingModel;
