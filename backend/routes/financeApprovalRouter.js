import { getAllFinanceApproval } from "../controllers/financeApprovalController.js";

import express from "express";

const financeApprovalRouter = express.Router();

financeApprovalRouter.get("/", getAllFinanceApproval);

export default financeApprovalRouter;
