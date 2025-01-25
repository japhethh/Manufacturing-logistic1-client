import tf from "@tensorflow/tfjs";
import express from "express";

const discrepancyTest = express.Router();

// Detect Discrepancies Using Simple Logic
const detectDiscrepancies = (inputData) => {
  return inputData.map((item, index) => {
    const { invoiceAmount, purchaseOrderAmount } = item;

    const isDiscrepancy = invoiceAmount !== purchaseOrderAmount; // Direct comparison
    if (isDiscrepancy) {
      return {
        index,
        actual: invoiceAmount,
        expected: purchaseOrderAmount,
        isDiscrepancy,
      };
    }
    return null; // No discrepancy
  });
};

// API Route
discrepancyTest.post("/", (req, res) => {
  try {
    const { data = [] } = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({ error: "No data provided for analysis." });
    }

    const discrepancies = detectDiscrepancies(data);

    // Filter out null values and respond with the result
    const filteredDiscrepancies = discrepancies.filter((item) => item !== null);
    res.json({ discrepancies: filteredDiscrepancies });
  } catch (error) {
    res.status(500).json({ error: "Error detecting discrepancies", details: error.message });
  }
});


export default discrepancyTest;
