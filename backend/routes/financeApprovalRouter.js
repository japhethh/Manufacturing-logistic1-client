import {
  approvedFinance,
  getAllFinanceApproval,
  rejectedFinance,
  updateFinanceApproval,
  pendingFinance,
} from "../controllers/financeApprovalController.js";

import express from "express";

const financeApprovalRouter = express.Router();

financeApprovalRouter.get("/", getAllFinanceApproval);
financeApprovalRouter.put("/update/:id", updateFinanceApproval);
// financeApprovalRouter.put("/approved/:id", approvedFinance);
financeApprovalRouter.put("/approved/:id", approvedFinance);
financeApprovalRouter.put("/rejected/:id", rejectedFinance);
financeApprovalRouter.get("/pendingFinance", pendingFinance);

export default financeApprovalRouter;
