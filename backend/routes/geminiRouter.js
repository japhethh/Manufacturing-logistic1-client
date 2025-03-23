import express from "express";
import { run } from "../geminiApi/geminiApi.js";
import historyInventoryModel from "../models/historyInventoryModel.js";

const geminiRouter = express.Router();

// Function to get historical inventory data
const getHistoricalInventoryData = async () => {
  try {
    // Fetch all historical inventory data
    const data = await historyInventoryModel.find({});
    return data;
  } catch (error) {
    console.error("Error fetching historical inventory data:", error);
    return [];
  }
};

// Function to predict future demand using Gemini AI
const predictFutureDemand = async () => {
  try {
    const historicalData = await getHistoricalInventoryData();

    if (historicalData.length === 0) {
      return "No historical data available for prediction.";
    }

    // Prepare the prompt for Gemini
    const prompt = `
      Given the historical inventory data, predict the demand for the next month.

      Historical Data:
      ${historicalData
        .map(
          (entry) =>
            `- Item: ${entry.itemName}, Quantity: ${entry.quantity}, Unit: ${entry.unit}, Date: ${entry.createdAt}`
        )
        .join("\n")}

      Predict the demand for each item for the next month based on historical trends.
      Assume a typical monthly demand growth of **5-15%** based on industry trends, unless the trend suggests otherwise.

      IMPORTANT: Return your response in this exact format:
      Item: <itemName>, Forecasted Quantity: <value>, Unit: <unit>

      Example:
      Item: Item A, Forecasted Quantity: 150, Unit: units
      Item: Item B, Forecasted Quantity: 200, Unit: units

      Format your response as: Item: <itemName>, Forecasted Quantity: <value>, Unit: <unit>
      IMPORTANT: Return numbers **without commas**.
    `;

    // Send request to Gemini AI
    const prediction = await run(prompt);
    return prediction;
  } catch (error) {
    console.error("Error predicting future demand:", error);
    return "Unable to generate prediction.";
  }
};

// API Route to get demand forecast
const getDemandForecast = async (req, res) => {
  try {
    const historicalData = await getHistoricalInventoryData();
    const prediction = await predictFutureDemand();

    res.status(200).json({
      historicalData,
      futurePrediction: prediction,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch demand forecast." });
  }
};

geminiRouter.get("/demand-forecast", getDemandForecast);

export default geminiRouter;
