import {
  getAllFinanceApproval,
  updateFinanceApproval,
} from "../controllers/financeApprovalController.js";

import express from "express";

const financeApprovalRouter = express.Router();

financeApprovalRouter.get("/", getAllFinanceApproval);
financeApprovalRouter.put("/update/:id", updateFinanceApproval);

export default financeApprovalRouter;
