// import biddingModel from "../models/biddingModel.js";
import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import categoryBiddingModel from "../models/categoryBiddingModel.js";
import generateServiceToken from "../middleware/gatewayGenerator.js";
import axios from "axios";
import biddingModel from "../models/biddingModel.js";
import Counter from "../models/Counter.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import supplierModel from "../models/supplierModel.js";
import NotificationVendorModel from "../models/notificationVendorModel.js";

const createdBidding = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const {
      userId,
      name,
      category,
      quantityRequired,
      unit,
      description,
      regularPrice,
      startBiddingPrice,
      biddingEndDate,
      productImage,
    } = req.body;

    const serviceToken = generateServiceToken();
    const response = await axios.get(
      `${process.env.API_GATEWAY_URL}/admin/get-accounts`,

      { headers: { Authorization: `Bearer ${serviceToken}` } }
    );

    const accountData = response.data;

    const userExist = accountData.find((a) => a._id === userId);

    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User id not found!" });
    }
    console.log(userExist);

    let image = "";

    const counter = await Counter.findByIdAndUpdate(
      {
        _id: "biddingNumber",
      },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const biddingNumber = counter.sequence_value.toString().padStart(3, "0");
    const reference = `Bd-${biddingNumber}`;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "BiddingImages",
        });

        if (req.file.path) {
          fs.unlinkSync(req.file.path);
        }

        image = result.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed", error });
      }
    }
    // const existUser = await userModel.findById(userId);
    // if (!existUser) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "User Id not found!" });
    // }

    const addNewBidding = new biddingModel({
      biddingNumber: reference,
      name,
      category,
      description,
      quantityRequired,
      unit,
      regularPrice,
      startBiddingPrice,
      biddingEndDate,
      productImage: image,
      requestedBy: userId,
    });

    if (!addNewBidding) {
      return res
        .status(404)
        .json({ success: false, message: "Bidding not found!" });
    }

    await addNewBidding.save();

    res
      .status(201)
      .json({ success: true, message: "Created Bidding Successfully!" });
  } catch (error) {
    console.log(error);
  }
});

const getAllBidding = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch all bidding products from the database
    const products = await biddingModel
      .find({})
      .populate(
        "bids.vendor",
        "_id supplierName supplierCode contactPhone contactEmail address rating"
      );

    // Check if products exist
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bidding products found!" });
    }

    // Return the products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching bidding data:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bidding data" });
  }
});
const getAllOpenBidding = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch all bidding products from the database
    const products = await biddingModel
      .find({ status: "open" })
      .populate(
        "bids.vendor",
        "_id supplierName supplierCode contactPhone contactEmail address rating"
      );

    // Check if products exist
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bidding products found!" });
    }

    // Return the products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching bidding data:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bidding data" });
  }
});

// const getSpecificId = expressAsyncHandler(async (req, res) => {
//   const { userId } = req.body;
//   const { id } = req.params;

//   const existUser = await userModel.findById(userId);

//   if (!existUser) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Bidding Id not found!" });
//   }

//   const existBidding = await biddingModel.findById(id);

//   if (!existBidding) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Bidding Id not found!" });
//   }

//   res.status(200).json(existBidding);
// });

// Delete Bidding
const deleteBidding = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, winnerId } = req.body;

  const existBidding = await biddingModel.findById(id);

  if (!existBidding) {
    return res
      .status(404)
      .json({ success: false, message: "Bidding Id not found!" });
  }

  if (winnerId) {
    const existSupplier = await supplierModel.findByIdAndUpdate(
      winnerId,
      { winner: "pending" },
      { new: true }
    );

    if (!existSupplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier id not found!" });
    }
  }

  const deletedBidding = await biddingModel.findByIdAndDelete(id);

  if (!deletedBidding) {
    return res
      .status(400)
      .json({ success: false, message: "Bidding id not found!" });
  }

  res
    .status(200)
    .json({ success: true, message: "Deleted Bidding!", data: deletedBidding });
});

// const updateBidding = expressAsyncHandler(async (req, res) => {
//   const { userId } = req.body;
//   const { id } = req.params;

//   const existUser = await userModel.findById(userId);

//   if (!existUser) {
//     return res
//       .status(404)
//       .json({ success: false, message: "User Id not found!" });
//   }

//   const updatedUser = await biddingModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });

//   if (!updatedUser) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Bidding Id not found!" });
//   }

//   res.status(200).json({ success: true, message: "Updated Successfully!" });
// });

// Category
const createCategoryBidding = expressAsyncHandler(async (req, res) => {
  const { userId, category } = req.body;

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }
  console.log(userExist);

  // const existUser = await userModel.findById(userId);

  // if (!existUser) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "User id not found!" });
  // }

  const newCategory = new categoryBiddingModel({
    category,
  });

  if (!newCategory) {
    return res
      .status(404)
      .json({ success: false, message: "User id not found!" });
  }
  await newCategory.save();

  res.status(201).json({
    success: true,
    message: "Created Successfully",
    data: newCategory,
  });
});

const getAllCategoryBidding = expressAsyncHandler(async (req, res) => {
  // const { userId } = req.body;

  // const existUser = await userModel.findById(userId);

  // if (!existUser) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "User id not found!" });
  // }

  const getData = await categoryBiddingModel.findOne({ category: "dress" });

  res.status(200).json({ data: getData });
});

const getAllCategoryBiddings = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await categoryBiddingModel.find({});

    // Check if categories exist
    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found!" });
    }

    // Return the categories
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
});

const updateCategoryBidding = expressAsyncHandler(async (req, res) => {
  const { userId, category } = req.body;
  const { _id } = req.params;

  if (!userId || category) {
    return res.status(400).json({ success: false, message: "Input Required!" });
  }

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  // const existUser = await userModel.findById(userId);

  // if (!existUser) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "User id not found!" });
  // }

  const updated = await categoryBiddingModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!updated) {
    return res
      .status(400)
      .json({ success: false, message: "Update id not found!" });
  }

  res.status(200).json({ success: true, message: "Updated Successfully" });
});

const deleteCategoryBidding = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { _id } = req.params;

  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
    { headers: { Authorization: `Bearer ${serviceToken}` } }
  );

  const accountData = response.data;

  const userExist = accountData.find((a) => a._id === userId);

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  // const existUser = await userModel.findById(userId);

  // if (!existUser) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "User id not found!" });
  // }

  const deleted = await categoryBiddingModel.findByIdAndDelete(_id);

  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Category Bidding Id not found!" });
  }

  res.status(200).json({ success: true, message: "Deleted" });
});

const updateBidding = expressAsyncHandler(async (req, res) => {
  const { userId, bids, terms, deliveryTime } = req.body;
  const { id } = req.params;

  const existUser = await supplierModel.findById(userId);

  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: "Supplier ID not found!" });
  }

  const existingBidding = await biddingModel.findById(id);

  if (!existingBidding) {
    return res
      .status(404)
      .json({ success: false, message: "Bidding not found!" });
  }

  // Check if the user already placed a bid
  const existingBidIndex = existingBidding.bids.findIndex(
    (bid) => bid.vendor.toString() === userId
  );

  let updatedBidding;

  if (existingBidIndex !== -1) {
    // If the bidder already exists, update their bid
    updatedBidding = await biddingModel.findOneAndUpdate(
      { _id: id, "bids.vendor": userId },
      {
        $set: {
          "bids.$.bidAmount": bids,
          "bids.$.terms": terms,
          "bids.$.deliveryTime": deliveryTime,
        },
      },
      { new: true }
    );
  } else {
    // If it's a new bidder, push a new bid
    updatedBidding = await biddingModel.findByIdAndUpdate(
      id,
      {
        $push: {
          bids: {
            vendor: userId,
            bidAmount: bids,
            terms: terms,
            deliveryTime: deliveryTime,
          },
        },
      },
      { new: true }
    );
  }

  res.status(200).json({
    success: true,
    message:
      existingBidIndex !== -1
        ? "Bid updated successfully"
        : "Bid added successfully",
    data: updatedBidding,
  });
});

const selectBiddingWinner = expressAsyncHandler(async (req, res) => {
  const { biddingId, winnerId } = req.body;

  // Check if the bidding exists
  const bidding = await biddingModel
    .findById(biddingId)
    .populate("bids.vendor");
  if (!bidding) {
    return res
      .status(404)
      .json({ success: false, message: "Bidding not found!" });
  }

  // Check if the supplier exists
  const supplier = await supplierModel.findById(winnerId);
  if (!supplier) {
    return res
      .status(404)
      .json({ success: false, message: "Supplier not found!" });
  }

  // Check if the winner is in the bid list
  const isValidWinner = bidding.bids.some(
    (bid) => bid.vendor._id.toString() === winnerId
  );
  if (!isValidWinner) {
    return res.status(400).json({
      success: false,
      message: "Supplier did not participate in this bid!",
    });
  }

  // Update the bidding with the winner
  bidding.winner = winnerId;
  bidding.status = "awarded"; // Mark as awarded
  await bidding.save();

  supplier.winner = "winner";

  await supplier.save();

  // Create a winner notification message
  const notificationMessage = `🎉 Congratulations, ${supplier.supplierName}! 🎉\n\nYou have been selected as the winning supplier for the bid on **${bidding.item}**. Please review the details and proceed with the next steps.`;

  // Save notification for the winning supplier
  const newNotification = new NotificationVendorModel({
    supplierWinner: winnerId,
    // user: newTrackingOrder.purchaseOrderId.createdBy,
    supplier: winnerId,
    message: notificationMessage,
    type: "awarded",
    // invoiceId: invoiced._id,
  });
  await newNotification.save();

  res.status(200).json({
    success: true,
    message: `Winner selected successfully! 🎉 ${supplier.supplierName} has won the bid for ${bidding.item}.`,
    data: bidding,
  });
});

export {
  getAllBidding,
  createdBidding,
  // getSpecificId,
  deleteBidding,
  updateBidding,
  // Category
  createCategoryBidding,
  getAllCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
  getAllCategoryBiddings,
  selectBiddingWinner,
  getAllOpenBidding,
};
