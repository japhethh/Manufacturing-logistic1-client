import mongoose from "mongoose";

const categoryBiddingSchema = new mongoose.Schema(
  {
    categoryNumber: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

const categoryBiddingModel = mongoose.model(
  "categoryBidding",
  categoryBiddingSchema
);

export default categoryBiddingModel;
