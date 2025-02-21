import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", // Assuming "Supplier" is your vendor model
      required: true,
    },
    bidAmount: { type: Number, required: true }, // Vendor's bid price
    bidDate: { type: Date, default: Date.now }, // Timestamp of bid placement
  },
  { timestamps: true }
);

const biddingSchema = new mongoose.Schema(
  {
    biddingNumber: { type: String, unique: true },
    name: { type: String, required: true }, // Item name
    category: { type: String, required: true }, // Example: "Raw Materials"
    description: { type: String, required: true }, // Short details about the item
    quantityRequired: { type: Number, required: true }, // Example: 500
    unit: { type: String, required: true }, // Example: "kg", "pieces"
    regularPrice: { type: Number, required: true }, // Normal price without bidding
    startBiddingPrice: { type: Number, required: true }, // Minimum bid vendors can offer
    biddingEndDate: { type: Date, required: true }, // When bidding closes
    productImage: { type: String }, // Optional image

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    }, // Open when bidding is active, Closed when finished
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Who created the bid (logistics team)
    bids: [bidSchema], // Array of bids placed by vendors

  },
  { timestamps: true }
);

const BiddingModel = mongoose.model("Bidding", biddingSchema);

export default BiddingModel;
