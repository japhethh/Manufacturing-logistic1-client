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
  const { userId } = req.body;
  // const existUser = await userModel.find({});
  // if (!existUser) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "User Id not found!" });
  // }

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

  const product = await biddingModel.find({});
  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: "Bidding not found!" });
  }


  res.status(200).json(product);
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
  const { userId } = req.body;



  const existBidding = await biddingModel.findById(id);

  if (!existBidding) {
    return res
      .status(404)
      .json({ success: false, message: "Bidding Id not found!" });
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
  const { userId } = req.body;

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

export {
  getAllBidding,
  createdBidding,
  // getSpecificId,
  deleteBidding,
  // updateBidding,
  // Category
  createCategoryBidding,
  getAllCategoryBidding,
  updateCategoryBidding,
  deleteCategoryBidding,
  getAllCategoryBiddings,
};
