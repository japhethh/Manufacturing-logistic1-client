import {
  approvedFinance,
  getAllFinanceApproval,
  updateFinanceApproval,
} from "../controllers/financeApprovalController.js";

import express from "express";

const financeApprovalRouter = express.Router();

financeApprovalRouter.get("/", getAllFinanceApproval);
financeApprovalRouter.put("/update/:id", updateFinanceApproval);
// financeApprovalRouter.put("/approved/:id", approvedFinance);
financeApprovalRouter.put("/approved", approvedFinance);

export default financeApprovalRouter;
