import express from "express";
import { getAllReturnRequest } from "../controllers/returnRequestController.js";

const returnManagementRouter = express.Router();

returnManagementRouter.get("/", getAllReturnRequest);

export default returnManagementRouter;
