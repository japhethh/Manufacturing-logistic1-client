// import biddingModel from "../models/biddingModel.js";
import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import categoryBiddingModel from "../models/categoryBiddingModel.js";

// const createdBidding = expressAsyncHandler(async (req, res) => {
//   try {
//     const {
//       userId,
//       name,
//       category,
//       description,
//       regularPrice,
//       startBiddingAmount,
//       biddingEndDateTime,
//       productImage,
//     } = req.body;

//     const existUser = await userModel.findById(userId);
//     if (!existUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Id not found!" });
//     }

//     const addNewBidding = new biddingModel({
//       name,
//       category,
//       description,
//       regularPrice,
//       startBiddingAmount,
//       biddingEndDateTime,
//       productImage,
//     });

//     if (!addNewBidding) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Bidding not found!" });
//     }

//     await biddingModel.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Created Bidding Successfully!" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// const getAllBidding = expressAsyncHandler(async (req, res) => {
//   const existUser = await userModel.find({});
//   if (!existUser) {
//     return res
//       .status(404)
//       .json({ success: false, message: "User Id not found!" });
//   }

//   res.status(200).json(existUser);
// });

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

// // Delete Bidding
// const deleteBidding = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;

//   const existUser = await userModel.findById(userId);
//   if (!existUser) {
//     return res
//       .status(404)
//       .json({ success: false, message: "User id not found!" });
//   }

//   const existBidding = await biddingModel.findById(id);

//   if (!existBidding) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Bidding Id not found!" });
//   }

//   const deletedBidding = await biddingModel.findByIdAndDelete(id);

//   if (!deletedBidding) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Bidding id not found!" });
//   }

//   res
//     .status(200)
//     .json({ success: true, message: "Deleted Bidding!", data: deletedBidding });
// });

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

  const existUser = await userModel.findById(userId);

  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: "User id not found!" });
  }

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
  const { userId } = req.body;

  const existUser = await userModel.findById(userId);

  if (!existUser) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  const getData = await categoryBiddingModel.find();

  if (!getData) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  res.status(200).json(getData);
});

const updateCategoryBidding = expressAsyncHandler(async (req, res) => {
  const { userId, category } = req.body;
  const { _id } = req.params;

  if (!userId || category) {
    return res.status(400).json({ success: false, message: "Input Required!" });
  }

  const existUser = await userModel.findById(userId);

  if (!existUser) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

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

  const existUser = await userModel.findById(userId);

  if (!existUser) {
    return res
      .status(400)
      .json({ success: false, message: "User id not found!" });
  }

  const deleted = await categoryBiddingModel.findByIdAndDelete(_id);

  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Category Bidding Id not found!" });
  }

  res.status(200).json({ success: true, message: "Deleted" });
});

export {
  // getAllBidding,
  // createdBidding,
  // getSpecificId,
  // deleteBidding,
  // updateBidding,
  // Category
  createCategoryBidding,
  getAllCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
  getAllCategoryBiddings,
};
