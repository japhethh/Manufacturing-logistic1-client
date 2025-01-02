import express from "express";
import {
  getMonthlySalesAndRevenue,
  getYearlySalesAndRevenue,
} from "../controllers/salesAndRevenueAggregate.js";
import { authMiddleware } from "../middleware/Auth.js";

const salesAndRevenueRouter = express.Router();

salesAndRevenueRouter.get(
  "/monthly-sales-revenue",
  authMiddleware,
  async (req, res) => {
    const { userId } = req.body;
    try {
      const monthlyData = await getMonthlySalesAndRevenue(userId);
      res.status(200).json(monthlyData);
    } catch (error) {
      console.error("Error fetching monthly sales and revenue:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

salesAndRevenueRouter.get(
  "/yearly-sales-revenue",
  authMiddleware,
  async (req, res) => {
    const { userId } = req.body;
    try {
      const yearlyData = await getYearlySalesAndRevenue(userId);
      res.status(200).json(yearlyData);
    } catch (error) {
      console.error("Error fetching yearly sales and revenue:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default salesAndRevenueRouter;
