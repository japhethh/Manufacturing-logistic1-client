import express from "express";
import { FilterAccounts } from "../testing/aggregateUser.js";

const testingAggregateUserRouter = express.Router();

testingAggregateUserRouter.get("/filterRoles", FilterAccounts);

export default testingAggregateUserRouter;
