import mongoose from "mongoose";

const biddingSchema = new mongoose(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String },
    regularPrice: { type: Number, required: true },
    startBiddingAmount: { type: Number },
    biddingEndDateTime: { type: Date },
    productImage: { type: String },
  },
  { timestamps: true }
  
);

const biddingModel = mongoose.model("biddingLogistic", biddingSchema);

export default biddingModel;
