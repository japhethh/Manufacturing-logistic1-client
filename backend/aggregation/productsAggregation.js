import expressAsyncHandler from "express-async-handler";
import materialModel from "../models/materialModel.js";
import expressAsynHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";

const productCount = expressAsynHandler(async (req, res) => {
  const products = await materialModel.aggregate([
    {
      $count: "totalProducts",
    },
  ]);

  res.status(200).json(products);
});

const vendorCount = expressAsyncHandler(async (req, res) => {
  const vendors = await supplierModel.aggregate([
    {
      $count: "totalVendors",
    },
  ]);

  res.status(200).json(vendors);
});

export { productCount, vendorCount };
