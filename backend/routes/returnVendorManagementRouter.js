import express from "express";
import { getAllReturnRequest } from "../controllers/returnRequestController.js";

const returnVendorManagementRouter = express.Router();

returnVendorManagementRouter.get("/", getAllReturnRequest);

export default returnVendorManagementRouter;
