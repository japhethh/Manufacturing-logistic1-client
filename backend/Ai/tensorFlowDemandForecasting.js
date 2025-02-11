import tf from "@tensorflow/tfjs";
import { forecastData } from "../aggregation/rawMaterialAggregation.js"; // Import the aggregation function
import express from "express";
import expressAsyncHandler from "express-async-handler";

// Create an Express router
const tensorflowDf = express.Router();

/**
 * Train the TensorFlow model for demand forecasting.
 * @param {Array} data - The normalized data with year, month, and totalQuantity.
 * @returns {Object} - The trained TensorFlow model.
 */
const trainModelDemandForecasting = async (data) => {
  // Create tensors for input (xs) and output (ys)
  const xs = tf.tensor2d(
    data.map((d) => [d.year, d.month]),
    [data.length, 2]
  );

  const ys = tf.tensor2d(
    data.map((d) => [d.totalQuantity]),
    [data.length, 1]
  );

  // Define a sequential model
  const model = tf.sequential();

  // Add layers to the model
  model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  // Compile the model
  model.compile({
    loss: "meanSquaredError",
    optimizer: "adam",
  });

  // Train the model
  await model.fit(xs, ys, { epochs: 200 });

  return model;
};

/**
 * Normalize the input data for TensorFlow model training.
 * @param {Array} data - The raw data with year, month, and totalQuantity.
 * @returns {Object} - An object containing normalized data and max values for denormalization.
 */
const normalizeData = (data) => {
  const maxMonth = Math.max(...data.map((d) => d._id.month));
  const maxYear = Math.max(...data.map((d) => d._id.year));
  const maxQuantity = Math.max(...data.map((d) => d.totalQuantity));

  const normalizedData = data.map((d) => ({
    month: d._id.month / maxMonth,
    year: d._id.year / maxYear,
    totalQuantity: d.totalQuantity / maxQuantity,
  }));

  return { normalizedData, maxMonth, maxYear, maxQuantity };
};

/**
 * Denormalize the predicted value to get the original scale.
 * @param {number} prediction - The normalized prediction value.
 * @param {number} maxQuantity - The maximum quantity used for normalization.
 * @returns {number} - The denormalized prediction.
 */
const denormalizePrediction = (prediction, maxQuantity) => {
  return prediction * maxQuantity;
};

/**
 * Endpoint to forecast demand for raw materials.
 */
tensorflowDf.post(
  "/getRawMaterial",
  expressAsyncHandler(async (req, res) => {
    try {
      // Get the current date
      const currentDate = new Date();
      
      // Calculate the next month and year
      let nextMonth = currentDate.getMonth() + 1; // Get next month (0-based index, so add 1)
      let nextYear = currentDate.getFullYear();

      // If the next month exceeds December (month 12), increment the year
      if (nextMonth > 12) {
        nextMonth = 1; // Reset to January (month 1)
        nextYear += 1; // Increment the year
      }

      // Log the calculated next month and year (for debugging)
      console.log(`Next Month: ${nextMonth}, Next Year: ${nextYear}`);  

      // Validate request body - here, we won't need month/year from the body anymore
      // const { month, year } = req.body; // This part is now removed

      // Fetch data for the calculated next month and year
      const data = await forecastData(req, res);

      // Check if data is available
      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No data available for forecasting!" });
      }

      // Normalize the data
      const { normalizedData, maxMonth, maxYear, maxQuantity } = normalizeData(data);

      // Train the model using the normalized data
      const model = await trainModelDemandForecasting(normalizedData);

      // Prepare input tensor for prediction using the calculated next month and year
      const inputTensor = tf.tensor2d([[nextYear / maxYear, nextMonth / maxMonth]], [1, 2]);

      // Get prediction
      const prediction = model.predict(inputTensor);
      const normalizedResult = prediction.dataSync()[0];

      // Denormalize the prediction to get the actual demand
      const result = denormalizePrediction(normalizedResult, maxQuantity);

      // Send response
      res.status(200).json({ success: true, predictedDemand: result });
    } catch (error) {
      console.error("Error in /getRawMaterial:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  })
);


export default tensorflowDf;
