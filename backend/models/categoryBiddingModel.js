import mongoose from "mongoose";

const categoryBiddingSchema = new mongoose.Schema(
  {
    category: { type: String },
  },
  { timestamps: true }
);

const categoryBiddingModel = mongoose.model(
  "categoryBidding",
  categoryBiddingSchema
);

export default categoryBiddingModel;
